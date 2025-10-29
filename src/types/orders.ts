export interface OrderItem {
  product_id: string
  product_name: string
  sku: string
  quantity: number
  price: number
  total: number
  size?: string
  color?: string
  image_url?: string
  returned_quantity?: number // للتتبع الكمية المرجعة
}

export interface ReturnItem {
  order_item_id: string
  product_id: string
  product_name: string
  sku: string
  quantity: number
  reason: string
  condition: 'new' | 'damaged' | 'used'
  refund_amount: number
  returned_to_inventory: boolean
}

export interface OrderReturn {
  $id?: string
  order_id: string
  return_number: string
  return_reason: string
  return_status: 'requested' | 'approved' | 'processing' | 'completed' | 'rejected'
  return_method: 'pickup' | 'drop_off' | 'mail'
  items: ReturnItem[]
  total_refund_amount: number
  shipping_refund: number
  processing_fee: number
  notes: string
  requested_at: string
  processed_at?: string
  completed_at?: string
}

export interface OrderAddress {
  full_name: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  postal_code: string
  country: string
  phone: string
  email?: string
}

export interface OrderTracking {
  carrier: string
  tracking_number: string
  tracking_url?: string
  shipped_at?: string
  delivered_at?: string
  estimated_delivery?: string
  tracking_events?: TrackingEvent[]
}

export interface TrackingEvent {
  date: string
  status: string
  location: string
  description: string
}

export interface EnhancedOrder {
  $id: string
  order_number: string
  
  // Customer Information
  customer_id: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  
  // Order Items
  items: OrderItem[]
  
  // Financial Information
  subtotal: number
  shipping_amount: number
  tax_amount: number
  discount_amount: number
  total_amount: number
  currency: string
  
  // Status Information
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned' | 'partially_returned'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded'
  fulfillment_status: 'unfulfilled' | 'partial' | 'fulfilled' | 'cancelled' | 'returned'
  
  // Payment Information
  payment_method: string
  transaction_id?: string
  payment_gateway: string
  
  // Shipping Information
  shipping_method: string
  shipping_address: OrderAddress
  billing_address: OrderAddress
  tracking: OrderTracking
  
  // Return Information
  returns?: OrderReturn[]
  total_returned_amount: number
  
  // Administrative
  notes: string
  internal_notes?: string
  tags: string[]
  
  // Timestamps
  $createdAt: string
  $updatedAt: string
  shipped_at?: string
  delivered_at?: string
  cancelled_at?: string
}

export interface OrderStats {
  total: number
  pending: number
  processing: number
  shipped: number
  delivered: number
  cancelled: number
  returned: number
  totalRevenue: number
  totalRefunded: number
  averageOrderValue: number
}

export interface InventoryMovement {
  product_id: string
  sku: string
  movement_type: 'sale' | 'return' | 'adjustment' | 'restock'
  quantity: number
  reason: string
  order_id?: string
  return_id?: string
  created_at: string
  created_by: string
}

export interface OrderFilters {
  search?: string
  status?: string
  payment_status?: string
  fulfillment_status?: string
  date_from?: string
  date_to?: string
  customer_id?: string
  limit?: number
  offset?: number
}

// Action types for order management
export type OrderAction = 
  | 'mark_paid'
  | 'mark_shipped' 
  | 'mark_delivered'
  | 'cancel_order'
  | 'process_return'
  | 'approve_return'
  | 'reject_return'
  | 'complete_return'
  | 'add_tracking'
  | 'update_notes'
  | 'send_email'
  | 'print_label'
  | 'print_invoice'

export interface OrderActionPayload {
  action: OrderAction
  order_id: string
  data?: any
  notes?: string
}