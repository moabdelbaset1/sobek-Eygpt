import { NextRequest, NextResponse } from "next/server"
import { Query } from "node-appwrite"
import { createAdminClient } from "@/lib/appwrite-admin"
import { DATABASE_ID, PRODUCTS_COLLECTION_ID } from "@/lib/appwrite"
import type {
  InventoryDetails,
  SalesAnalytics,
  StockMovement,
  InventoryAlert,
  ProductInventorySummary,
  InventoryOverview,
  EnhancedProductStats,
  InventoryFilters
} from "@/types/inventory"

// Collection IDs for related data
const ORDERS_COLLECTION_ID = "orders"
const ORDER_ITEMS_COLLECTION_ID = "order_items"
const STOCK_MOVEMENTS_COLLECTION_ID = "stock_movements"
const INVENTORY_ALERTS_COLLECTION_ID = "inventory_alerts"
const CATEGORIES_COLLECTION_ID = "categories"
const BRANDS_COLLECTION_ID = "brands"

/**
 * Calculate sales analytics for a product
 */
async function calculateSalesAnalytics(
  databases: any,
  productId: string,
  productPrice: number
): Promise<SalesAnalytics> {
  try {
    // Get all order items for this product
    const orderItemsResult = await databases.listDocuments(
      DATABASE_ID,
      ORDER_ITEMS_COLLECTION_ID,
      [
        Query.equal("product_id", productId),
        Query.limit(1000) // Consider pagination for large datasets
      ]
    )

    const orderItems = orderItemsResult.documents

    if (orderItems.length === 0) {
      return {
        productId,
        totalSold: 0,
        soldToday: 0,
        soldThisWeek: 0,
        soldThisMonth: 0,
        soldThisYear: 0,
        averageSalesPerDay: 0,
        salesVelocity: 'stagnant',
        revenue: {
          total: 0,
          today: 0,
          thisWeek: 0,
          thisMonth: 0,
          thisYear: 0
        }
      }
    }

    // Calculate date ranges
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const thisWeekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const thisYearStart = new Date(now.getFullYear(), 0, 1)

    let totalSold = 0
    let soldToday = 0
    let soldThisWeek = 0
    let soldThisMonth = 0
    let soldThisYear = 0
    let totalRevenue = 0
    let revenueToday = 0
    let revenueThisWeek = 0
    let revenueThisMonth = 0
    let revenueThisYear = 0
    let lastSaleDate: string | undefined

    for (const item of orderItems) {
      const quantity = item.quantity || 0
      const price = item.price || productPrice
      const revenue = quantity * price
      const createdAt = new Date(item.$createdAt)

      totalSold += quantity
      totalRevenue += revenue

      if (createdAt >= today) {
        soldToday += quantity
        revenueToday += revenue
      }

      if (createdAt >= thisWeekStart) {
        soldThisWeek += quantity
        revenueThisWeek += revenue
      }

      if (createdAt >= thisMonthStart) {
        soldThisMonth += quantity
        revenueThisMonth += revenue
      }

      if (createdAt >= thisYearStart) {
        soldThisYear += quantity
        revenueThisYear += revenue
      }

      if (!lastSaleDate || createdAt > new Date(lastSaleDate)) {
        lastSaleDate = item.$createdAt
      }
    }

    // Calculate average sales per day (last 30 days)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const salesLast30Days = orderItems.filter(item => 
      new Date(item.$createdAt) >= thirtyDaysAgo
    ).reduce((sum, item) => sum + (item.quantity || 0), 0)
    
    const averageSalesPerDay = salesLast30Days / 30

    // Determine sales velocity
    let salesVelocity: 'fast' | 'medium' | 'slow' | 'stagnant' = 'stagnant'
    if (averageSalesPerDay >= 10) salesVelocity = 'fast'
    else if (averageSalesPerDay >= 3) salesVelocity = 'medium'
    else if (averageSalesPerDay >= 0.5) salesVelocity = 'slow'

    return {
      productId,
      totalSold,
      soldToday,
      soldThisWeek,
      soldThisMonth,
      soldThisYear,
      lastSaleDate,
      averageSalesPerDay,
      salesVelocity,
      revenue: {
        total: totalRevenue,
        today: revenueToday,
        thisWeek: revenueThisWeek,
        thisMonth: revenueThisMonth,
        thisYear: revenueThisYear
      }
    }
  } catch (error) {
    console.error('Error calculating sales analytics:', error)
    return {
      productId,
      totalSold: 0,
      soldToday: 0,
      soldThisWeek: 0,
      soldThisMonth: 0,
      soldThisYear: 0,
      averageSalesPerDay: 0,
      salesVelocity: 'stagnant',
      revenue: {
        total: 0,
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        thisYear: 0
      }
    }
  }
}

/**
 * Get inventory details for a product
 */
function calculateInventoryDetails(product: any): InventoryDetails {
  const currentStock = product.units || product.stockQuantity || 0
  const reservedStock = product.reservedStock || 0
  const availableStock = Math.max(0, currentStock - reservedStock)
  const reorderPoint = product.lowStockThreshold || product.min_order_quantity || 5
  const stockValue = currentStock * (product.costPerItem || product.price || 0)

  return {
    productId: product.$id,
    currentStock,
    reservedStock,
    availableStock,
    reorderPoint,
    maxStock: product.maxStock || 1000,
    minStock: product.minStock || 0,
    lastRestockDate: product.lastRestockDate,
    nextRestockDate: product.nextRestockDate,
    stockValue
  }
}

/**
 * Get recent stock movements for a product
 */
async function getRecentStockMovements(
  databases: any,
  productId: string
): Promise<StockMovement[]> {
  try {
    const result = await databases.listDocuments(
      DATABASE_ID,
      STOCK_MOVEMENTS_COLLECTION_ID,
      [
        Query.equal("product_id", productId),
        Query.orderDesc("$createdAt"),
        Query.limit(10)
      ]
    )

    return result.documents.map((doc: any) => ({
      id: doc.$id,
      productId: doc.product_id,
      type: doc.type,
      quantity: doc.quantity,
      previousStock: doc.previous_stock,
      newStock: doc.new_stock,
      reason: doc.reason,
      reference: doc.reference,
      notes: doc.notes,
      createdBy: doc.created_by,
      createdAt: doc.$createdAt
    }))
  } catch (error) {
    console.warn('Stock movements collection not found, returning empty array')
    return []
  }
}

/**
 * Get inventory alerts for a product
 */
async function getInventoryAlerts(
  databases: any,
  productId: string
): Promise<InventoryAlert[]> {
  try {
    const result = await databases.listDocuments(
      DATABASE_ID,
      INVENTORY_ALERTS_COLLECTION_ID,
      [
        Query.equal("product_id", productId),
        Query.equal("resolved", false),
        Query.orderDesc("$createdAt")
      ]
    )

    return result.documents.map((doc: any) => ({
      id: doc.$id,
      productId: doc.product_id,
      productName: doc.product_name,
      type: doc.type,
      severity: doc.severity,
      message: doc.message,
      currentStock: doc.current_stock,
      threshold: doc.threshold,
      createdAt: doc.$createdAt,
      resolved: doc.resolved,
      resolvedAt: doc.resolved_at
    }))
  } catch (error) {
    console.warn('Inventory alerts collection not found, returning empty array')
    return []
  }
}

/**
 * Get enhanced product stats
 */
async function getEnhancedProductStats(
  databases: any,
  products: any[]
): Promise<EnhancedProductStats> {
  const total = products.length
  const available = products.filter(p => p.is_active).length
  const unavailable = total - available
  const onSale = products.filter(p => p.discount_price > 0).length
  const lowStock = products.filter(p => {
    const stock = p.units || p.stockQuantity || 0
    const threshold = p.lowStockThreshold || p.min_order_quantity || 5
    return stock > 0 && stock <= threshold
  }).length
  const outOfStock = products.filter(p => (p.units || p.stockQuantity || 0) === 0).length
  
  const totalValue = products.reduce((sum, p) => {
    const stock = p.units || p.stockQuantity || 0
    const price = p.price || 0
    return sum + (stock * price)
  }, 0)

  // Calculate other metrics (these would come from sales data)
  const totalSold = products.reduce((sum, p) => sum + (p.salesCount || 0), 0)
  const totalRevenue = products.reduce((sum, p) => sum + ((p.salesCount || 0) * (p.price || 0)), 0)
  
  return {
    total,
    available,
    unavailable,
    onSale,
    lowStock,
    outOfStock,
    totalValue,
    totalSold,
    totalRevenue,
    averageMargin: products.length > 0 ? totalRevenue / products.length : 0,
    fastMovers: products.filter(p => (p.salesCount || 0) > 50).length,
    slowMovers: products.filter(p => (p.salesCount || 0) < 5).length,
    criticalAlerts: lowStock + outOfStock,
    reservedStock: products.reduce((sum, p) => sum + (p.reservedStock || 0), 0)
  }
}

/**
 * GET /api/admin/inventory-analytics
 * Enhanced inventory analytics endpoint
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")
    const detailed = searchParams.get("detailed") === "true"
    const limit = parseInt(searchParams.get("limit") || "50")
    const offset = parseInt(searchParams.get("offset") || "0")

    console.log('🔍 Fetching inventory analytics:', { productId, detailed, limit, offset })

    const { databases } = await createAdminClient()

    // If requesting specific product details
    if (productId) {
      const product = await databases.getDocument(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        productId
      )

      const [inventory, sales, alerts, movements] = await Promise.all([
        Promise.resolve(calculateInventoryDetails(product)),
        calculateSalesAnalytics(databases, productId, product.price || 0),
        getInventoryAlerts(databases, productId),
        getRecentStockMovements(databases, productId)
      ])

      const summary: ProductInventorySummary = {
        product: {
          id: product.$id,
          name: product.name,
          sku: product.sku || '',
          price: product.price || 0,
          costPrice: product.costPerItem || product.price || 0,
          category: product.category_id || '',
          brand: product.brand_id || ''
        },
        inventory,
        sales,
        alerts,
        warehouse: {
          location: product.warehouseLocation || 'Main Warehouse',
          section: product.warehouseSection || 'General',
          shelf: product.warehouseShelf,
          bin: product.warehouseBin,
          barcode: product.barcode
        },
        recentMovements: movements
      }

      return NextResponse.json({
        success: true,
        data: summary
      })
    }

    // Get all products for overview
    const queries = [
      Query.limit(limit),
      Query.offset(offset),
      Query.orderDesc("$createdAt")
    ]

    const result = await databases.listDocuments(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID,
      queries
    )

    const products = result.documents

    // Get enhanced stats
    const stats = await getEnhancedProductStats(databases, products)

    if (!detailed) {
      // Return just the stats for quick overview
      return NextResponse.json({
        success: true,
        stats,
        total: result.total
      })
    }

    // Get detailed analytics for all products
    const detailedProducts = await Promise.all(
      products.map(async (product: any) => {
        const [inventory, sales] = await Promise.all([
          Promise.resolve(calculateInventoryDetails(product)),
          calculateSalesAnalytics(databases, product.$id, product.price || 0)
        ])

        return {
          product: {
            id: product.$id,
            name: product.name,
            sku: product.sku || `${product.brand_id || 'SKU'}-${product.$id.slice(0, 8)}`,
            price: product.price || 0,
            costPrice: product.costPerItem || product.price || 0,
            category: product.category_id || '',
            brand: product.brand_id || ''
          },
          inventory,
          sales,
          alerts: [], // Skip alerts for overview to improve performance
          warehouse: {
            location: product.warehouseLocation || 'Main Warehouse',
            section: product.warehouseSection || 'General'
          },
          recentMovements: []
        }
      })
    )

    const overview: InventoryOverview = {
      totalProducts: stats.total,
      totalValue: stats.totalValue,
      lowStockCount: stats.lowStock,
      outOfStockCount: stats.outOfStock,
      overstockCount: 0, // Calculate based on maxStock
      totalReserved: stats.reservedStock,
      totalAvailable: stats.total - stats.outOfStock,
      totalMovements: {
        today: 0, // Would need stock movements data
        thisWeek: 0,
        thisMonth: 0
      },
      alerts: {
        critical: stats.outOfStock,
        warning: stats.lowStock,
        info: 0
      }
    }

    return NextResponse.json({
      success: true,
      overview,
      products: detailedProducts,
      stats,
      total: result.total
    })

  } catch (error: any) {
    console.error("❌ Error fetching inventory analytics:", error)
    
    return NextResponse.json({
      success: false,
      error: error.message,
      details: error.code || 'UNKNOWN_ERROR',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}