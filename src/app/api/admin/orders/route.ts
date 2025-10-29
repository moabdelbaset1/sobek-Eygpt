import { NextRequest, NextResponse } from "next/server"
import { Query } from "node-appwrite"
import { createAdminClient } from "@/lib/appwrite-admin"
import { EnhancedOrder, OrderItem, OrderReturn, InventoryMovement } from "@/types/orders"
import { inventoryMovementService } from '@/lib/services/InventoryMovementService'

// Get database ID from environment
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || ''
const ORDERS_COLLECTION_ID = 'orders'
const RETURNS_COLLECTION_ID = 'order_returns'
const INVENTORY_MOVEMENTS_COLLECTION_ID = 'inventory_movements'
const PRODUCTS_COLLECTION_ID = 'products'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get("orderId")
    const search = searchParams.get("search") || ""
    const limit = parseInt(searchParams.get("limit") || "100")
    const offset = parseInt(searchParams.get("offset") || "0")
    const status = searchParams.get("status")
    const paymentStatus = searchParams.get("paymentStatus")
    const fulfillmentStatus = searchParams.get("fulfillmentStatus")

    // Create admin client
    const { databases } = await createAdminClient()

    // If orderId is provided, fetch single order
    if (orderId) {
      const order = await databases.getDocument(DATABASE_ID, ORDERS_COLLECTION_ID, orderId)
      return NextResponse.json({ order })
    }

    // Build queries
    const queries = [
      Query.limit(limit),
      Query.offset(offset),
      Query.orderDesc('$createdAt')
    ]

    // Add search query if provided
    if (search) {
      queries.push(Query.search("order_number", search))
    }

    // Add filters
    if (status && status !== "all") {
      // Support both 'status' and 'fulfillment_status' fields
      queries.push(Query.equal("status", status))
    }

    if (paymentStatus && paymentStatus !== "all") {
      queries.push(Query.equal("payment_status", paymentStatus))
    }

    if (fulfillmentStatus && fulfillmentStatus !== "all") {
      queries.push(Query.equal("fulfillment_status", fulfillmentStatus))
    }

    // Fetch orders with retry logic for network issues
    let result
    let allOrders
    let retries = 3
    
    while (retries > 0) {
      try {
        result = await databases.listDocuments(DATABASE_ID, ORDERS_COLLECTION_ID, queries)
        allOrders = await databases.listDocuments(DATABASE_ID, ORDERS_COLLECTION_ID, [Query.limit(1000)])
        break // Success - exit retry loop
      } catch (error: any) {
        retries--
        if (error.code === 'UND_ERR_CONNECT_TIMEOUT' || error.message?.includes('Connect Timeout')) {
          console.log(`⚠️ Connection timeout, retrying... (${retries} attempts left)`)
          if (retries === 0) throw error // Out of retries
          await new Promise(resolve => setTimeout(resolve, 1000)) // Wait 1s before retry
        } else {
          throw error // Non-timeout error, don't retry
        }
      }
    }
    
    if (!result || !allOrders) {
      throw new Error('Failed to fetch orders after retries')
    }
    
    const orders = allOrders.documents

    const totalRevenue = orders
      .filter(o => o.payment_status === "paid")
      .reduce((sum, o) => sum + (o.total_amount || 0), 0)
    
    const totalRefunded = orders
      .reduce((sum, o) => sum + (o.total_returned_amount || 0), 0)

    const stats = {
      total: orders.length,
      pending: orders.filter(o => (o.status || o.order_status) === "pending").length,
      processing: orders.filter(o => (o.status || o.order_status) === "processing").length,
      shipped: orders.filter(o => (o.status || o.order_status) === "shipped").length,
      delivered: orders.filter(o => (o.status || o.order_status) === "delivered").length,
      cancelled: orders.filter(o => (o.status || o.order_status) === "cancelled").length,
      returned: orders.filter(o => (o.status || o.order_status) === "returned").length,
      totalRevenue,
      totalRefunded,
      averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0
    }

    return NextResponse.json({
      orders: result.documents,
      total: result.total,
      stats,
    })

  } catch (error: any) {
    console.error("Error fetching orders:", error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch orders" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    // Create admin client
    const { databases } = await createAdminClient()

    // Validate required fields
    const requiredFields = ['customer_id', 'items', 'total', 'shipping_address']
    for (const field of requiredFields) {
      if (!orderData[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Generate order number
    const orderNumber = `ORD-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`

    // Set default values
    const orderToCreate = {
      order_number: orderNumber,
      customer_id: orderData.customer_id,
      customer_name: orderData.customer_name || '',
      customer_email: orderData.customer_email || '',
      items: JSON.stringify(orderData.items), // Store as JSON string
      total: parseFloat(orderData.total),
      subtotal: parseFloat(orderData.subtotal || orderData.total),
      tax_amount: parseFloat(orderData.tax_amount || 0),
      shipping_amount: parseFloat(orderData.shipping_amount || 0),
      discount_amount: parseFloat(orderData.discount_amount || 0),
      status: orderData.status || 'pending',
      payment_status: orderData.payment_status || 'pending',
      fulfillment_status: orderData.fulfillment_status || 'unfulfilled',
      payment_method: orderData.payment_method || '',
      shipping_address: JSON.stringify(orderData.shipping_address),
      billing_address: JSON.stringify(orderData.billing_address || orderData.shipping_address),
      notes: orderData.notes || '',
      tracking_number: orderData.tracking_number || '',
      carrier: orderData.carrier || '',
      shipped_at: orderData.shipped_at || null,
      delivered_at: orderData.delivered_at || null
    }

    // Create the order
    const order = await databases.createDocument(
      DATABASE_ID,
      ORDERS_COLLECTION_ID,
      'unique()',
      orderToCreate
    )

    return NextResponse.json({ order }, { status: 201 })

  } catch (error: any) {
    console.error("Error creating order:", error)
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    )
  }
}

// Helper function to update inventory when products are returned
async function updateInventoryOnReturn(databases: any, returnItems: any[], orderId: string) {
  const inventoryMovements: InventoryMovement[] = []
  
  for (const item of returnItems) {
    try {
      // Get current product
      const product = await databases.getDocument(DATABASE_ID, PRODUCTS_COLLECTION_ID, item.product_id)
      
      // Only add to inventory if the returned item is in good condition
      if (item.condition === 'new' || item.condition === 'used') {
        const newQuantity = (product.quantity || 0) + item.quantity
        
        // Update product inventory
        await databases.updateDocument(
          DATABASE_ID, 
          PRODUCTS_COLLECTION_ID, 
          item.product_id,
          { quantity: newQuantity }
        )
        
        // Create inventory movement record
        const movement: InventoryMovement = {
          product_id: item.product_id,
          sku: item.sku,
          movement_type: 'return',
          quantity: item.quantity,
          reason: `Return from order ${orderId}: ${item.reason}`,
          order_id: orderId,
          return_id: item.return_id,
          created_at: new Date().toISOString(),
          created_by: 'admin' // يمكن تحسينه لاحقاً لإدراج المستخدم الفعلي
        }
        
        inventoryMovements.push(movement)
        
        // Log inventory movement
        await databases.createDocument(
          DATABASE_ID,
          INVENTORY_MOVEMENTS_COLLECTION_ID,
          'unique()',
          movement
        )
      }
    } catch (error) {
      console.error(`Failed to update inventory for product ${item.product_id}:`, error)
    }
  }
  
  return inventoryMovements
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get("orderId")
    const action = searchParams.get("action")
    const updateData = await request.json()

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      )
    }

    // Create admin client
    const { databases } = await createAdminClient()

    // Handle different actions
    if (action === "process_return") {
      return await processOrderReturn(databases, orderId, updateData)
    }

    // Regular order update - use only fields that exist
    const filteredUpdateData: any = {}

    // Handle status updates - try both 'status' and 'order_status' fields
    if (updateData.status) {
      filteredUpdateData.status = updateData.status
      filteredUpdateData.order_status = updateData.status
    }

    // Handle payment status
    if (updateData.payment_status) {
      filteredUpdateData.payment_status = updateData.payment_status
    }

    // Handle customer info
    if (updateData.customer_name) {
      filteredUpdateData.customer_name = updateData.customer_name
    }
    if (updateData.customer_email) {
      filteredUpdateData.customer_email = updateData.customer_email
    }

    // Handle tracking info
    if (updateData.tracking_number) {
      filteredUpdateData.tracking_number = updateData.tracking_number
    }
    if (updateData.carrier) {
      filteredUpdateData.carrier = updateData.carrier
    }

    // Add timestamps for status changes
    if (updateData.status === 'shipped') {
      filteredUpdateData.shipped_at = new Date().toISOString()
    }
    if (updateData.status === 'delivered') {
      filteredUpdateData.delivered_at = new Date().toISOString()

      // 📦 Reduce inventory when order is delivered
      console.log('📦 Order delivered, reducing inventory...');
      const inventoryResult = await reduceInventoryOnDelivery(databases, orderId);
      if (!inventoryResult.success) {
        console.warn('⚠️ Inventory reduction failed:', inventoryResult.error);
      }
    }
    if (updateData.status === 'cancelled') {
      filteredUpdateData.cancelled_at = new Date().toISOString()

      // 📦 Restore inventory when order is cancelled
      console.log('📦 Order cancelled, restoring inventory...');
      const inventoryResult = await restoreInventoryOnCancel(databases, orderId);
      if (!inventoryResult.success) {
        console.warn('⚠️ Inventory restoration failed:', inventoryResult.error);
      }
    }
    if (updateData.status === 'returned') {
      // 📦 Restore inventory when order is returned
      console.log('📦 Order returned, restoring inventory...');
      const inventoryResult = await restoreInventoryOnCancel(databases, orderId);
      if (!inventoryResult.success) {
        console.warn('⚠️ Inventory restoration failed:', inventoryResult.error);
      }
    }

    // Update the order - only with the fields that exist
    let updatedOrder = null
    if (Object.keys(filteredUpdateData).length > 0) {
      updatedOrder = await databases.updateDocument(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        orderId,
        filteredUpdateData
      )
    } else {
      console.warn('⚠️ No valid fields to update for order:', orderId)
      // Get the current order if no updates were made
      updatedOrder = await databases.getDocument(DATABASE_ID, ORDERS_COLLECTION_ID, orderId)
    }

    return NextResponse.json({ order: updatedOrder })

  } catch (error: any) {
    console.error("Error updating order:", error)
    return NextResponse.json(
      { error: error.message || "Failed to update order" },
      { status: 500 }
    )
  }
}

// Process order return
async function processOrderReturn(databases: any, orderId: string, returnData: any) {
  try {
    // Get the original order
    const order = await databases.getDocument(DATABASE_ID, ORDERS_COLLECTION_ID, orderId)
    const orderItems = JSON.parse(order.items || '[]')

    // Generate return number
    const returnNumber = `RET-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`

    // Create return record
    const returnRecord: OrderReturn = {
      order_id: orderId,
      return_number: returnNumber,
      return_reason: returnData.return_reason || 'Customer request',
      return_status: 'processing',
      return_method: returnData.return_method || 'pickup',
      items: returnData.items || [],
      total_refund_amount: calculateRefundAmount(returnData.items),
      shipping_refund: returnData.shipping_refund || 0,
      processing_fee: returnData.processing_fee || 0,
      notes: returnData.notes || '',
      requested_at: new Date().toISOString(),
      processed_at: new Date().toISOString()
    }

    // Save return record
    const createdReturn = await databases.createDocument(
      DATABASE_ID,
      RETURNS_COLLECTION_ID,
      'unique()',
      returnRecord
    )

    // Update inventory for returned items
    const inventoryMovements = await updateInventoryOnReturn(
      databases, 
      returnData.items.map((item: any) => ({
        ...item,
        return_id: createdReturn.$id
      })), 
      orderId
    )

    // Update order status
    const totalOrderItems = orderItems.reduce((sum: number, item: any) => sum + item.quantity, 0)
    const totalReturnedItems = returnData.items.reduce((sum: number, item: any) => sum + item.quantity, 0)
    
    let newOrderStatus = order.status
    let newPaymentStatus = order.payment_status
    
    if (totalReturnedItems >= totalOrderItems) {
      newOrderStatus = 'returned'
      newPaymentStatus = 'refunded'
    } else {
      newOrderStatus = 'partially_returned'
      newPaymentStatus = 'partially_refunded'
    }

    const updatedOrder = await databases.updateDocument(
      DATABASE_ID,
      ORDERS_COLLECTION_ID,
      orderId,
      {
        status: newOrderStatus,
        payment_status: newPaymentStatus,
        total_returned_amount: (order.total_returned_amount || 0) + returnRecord.total_refund_amount
      }
    )

    return NextResponse.json({ 
      return: createdReturn,
      order: updatedOrder,
      inventory_movements: inventoryMovements
    })

  } catch (error: any) {
    console.error("Error processing return:", error)
    return NextResponse.json(
      { error: error.message || "Failed to process return" },
      { status: 500 }
    )
  }
}

// Helper function to calculate refund amount
function calculateRefundAmount(items: any[]): number {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)
}

// Helper function to reduce inventory when order is delivered
async function reduceInventoryOnDelivery(databases: any, orderId: string) {
  try {
    console.log('📦 Reducing inventory for delivered order:', orderId);

    // Get order details
    const order = await databases.getDocument(DATABASE_ID, ORDERS_COLLECTION_ID, orderId);
    const orderItems = JSON.parse(order.items || '[]');

    const reductionResults = [];
    const reductionErrors = [];

    for (const item of orderItems) {
      try {
        // Get current product
        const product = await databases.getDocument(
          DATABASE_ID,
          PRODUCTS_COLLECTION_ID,
          item.product_id
        );

        const currentStock = product.units || product.stockQuantity || 0;
        const newStock = Math.max(0, currentStock - item.quantity); // Don't go below 0

        // Reduce product stock
        await databases.updateDocument(
          DATABASE_ID,
          PRODUCTS_COLLECTION_ID,
          item.product_id,
          {
            units: newStock,
            stockQuantity: newStock,
            $updatedAt: new Date().toISOString()
          }
        );

        console.log(`✅ Reduced stock for ${item.product_name}: ${currentStock} → ${newStock} (-${item.quantity})`);

        // 📝 Log inventory movement for this sale
        try {
          await inventoryMovementService.logSale(
            item.product_id,
            item.product_name,
            item.sku || `SKU-${item.product_id.slice(0, 8)}`,
            currentStock,
            item.quantity,
            orderId,
            undefined, // customer_id
            undefined // customer_name
          );
          console.log(`📝 Logged sale movement for ${item.product_name}`);
        } catch (movementError) {
          console.error(`⚠️ Failed to log sale movement for ${item.product_name}:`, movementError);
          // Don't fail the reduction if movement logging fails
        }

        reductionResults.push({
          productId: item.product_id,
          productName: item.product_name,
          previousStock: currentStock,
          newStock: newStock,
          quantityReduced: item.quantity
        });

      } catch (error) {
        console.error(`❌ Error reducing stock for product ${item.product_id}:`, error);
        reductionErrors.push({
          productId: item.product_id,
          productName: item.product_name,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    if (reductionErrors.length > 0) {
      console.warn('⚠️ Some stock reductions failed:', reductionErrors);
    }

    console.log('📦 Inventory reduction completed:', reductionResults.length, 'products reduced');

    return {
      success: reductionErrors.length === 0,
      reductionResults,
      reductionErrors
    };

  } catch (error) {
    console.error('❌ Failed to reduce inventory:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Helper function to restore inventory when order is cancelled/returned
async function restoreInventoryOnCancel(databases: any, orderId: string) {
  try {
    console.log('📦 Restoring inventory for cancelled order:', orderId);
    
    // Get order details
    const order = await databases.getDocument(DATABASE_ID, ORDERS_COLLECTION_ID, orderId);
    const orderItems = JSON.parse(order.items || '[]');
    
    const restorationResults = [];
    const restorationErrors = [];
    
    for (const item of orderItems) {
      try {
        // Get current product
        const product = await databases.getDocument(
          DATABASE_ID,
          PRODUCTS_COLLECTION_ID,
          item.product_id
        );
        
        const currentStock = product.units || product.stockQuantity || 0;
        const newStock = currentStock + item.quantity;
        
        // Restore product stock
        await databases.updateDocument(
          DATABASE_ID,
          PRODUCTS_COLLECTION_ID,
          item.product_id,
          {
            units: newStock,
            stockQuantity: newStock,
            $updatedAt: new Date().toISOString()
          }
        );
        
        console.log(`✅ Restored stock for ${item.product_name}: ${currentStock} → ${newStock} (+${item.quantity})`);
        
        // 📝 Log inventory movement for this return
        try {
          await inventoryMovementService.logReturn(
            item.product_id,
            item.product_name,
            item.sku || `SKU-${item.product_id.slice(0, 8)}`,
            currentStock,
            item.quantity,
            orderId,
            'Order cancelled by admin'
          );
          console.log(`📝 Logged return movement for ${item.product_name}`);
        } catch (movementError) {
          console.error(`⚠️ Failed to log return movement for ${item.product_name}:`, movementError);
          // Don't fail the restoration if movement logging fails
        }
        
        restorationResults.push({
          productId: item.product_id,
          productName: item.product_name,
          previousStock: currentStock,
          newStock: newStock,
          quantityRestored: item.quantity
        });
        
      } catch (error) {
        console.error(`❌ Error restoring stock for product ${item.product_id}:`, error);
        restorationErrors.push({
          productId: item.product_id,
          productName: item.product_name,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
    
    if (restorationErrors.length > 0) {
      console.warn('⚠️ Some stock restorations failed:', restorationErrors);
    }
    
    console.log('📦 Inventory restoration completed:', restorationResults.length, 'products restored');
    
    return {
      success: restorationErrors.length === 0,
      restorationResults,
      restorationErrors
    };
    
  } catch (error) {
    console.error('❌ Failed to restore inventory:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get("orderId")

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      )
    }

    // Create admin client
    const { databases } = await createAdminClient()

    // Delete the order
    await databases.deleteDocument(DATABASE_ID, ORDERS_COLLECTION_ID, orderId)

    return NextResponse.json({ success: true })

  } catch (error: any) {
    console.error("Error deleting order:", error)
    return NextResponse.json(
      { error: error.message || "Failed to delete order" },
      { status: 500 }
    )
  }
}
