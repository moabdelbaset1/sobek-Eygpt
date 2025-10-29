// Inventory Movement Types and Interfaces
export interface InventoryMovement {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  
  // Movement Details
  movement_type: 'sale' | 'return' | 'adjustment' | 'restock' | 'transfer' | 'damage' | 'expired' | 'manual';
  movement_reason: string;
  movement_reference?: string; // Order ID, Transfer ID, etc.
  
  // Product Information
  product_id: string;
  product_name: string;
  product_sku: string;
  
  // Quantity Information
  quantity_before: number;
  quantity_change: number; // Can be positive or negative
  quantity_after: number;
  
  // User & Context Information
  created_by: string; // Admin user ID or system
  created_by_name: string;
  created_by_role: 'admin' | 'system' | 'manager';
  
  // Additional Context
  order_id?: string;
  customer_id?: string;
  customer_name?: string;
  notes?: string;
  
  // Location/Warehouse (for future expansion)
  warehouse_id?: string;
  location?: string;
  
  // Cost Information (for accounting)
  unit_cost?: number;
  total_cost?: number;
  
  // Approval Status (for manual adjustments)
  status: 'pending' | 'approved' | 'rejected';
  approved_by?: string;
  approved_at?: string;
}

export interface InventoryMovementFilters {
  product_id?: string;
  movement_type?: string;
  date_from?: string;
  date_to?: string;
  created_by?: string;
  status?: string;
  order_id?: string;
  customer_id?: string;
}

export interface InventoryMovementStats {
  total_movements: number;
  movements_today: number;
  movements_this_week: number;
  movements_this_month: number;
  
  sales_total: number;
  returns_total: number;
  adjustments_total: number;
  
  top_moving_products: Array<{
    product_id: string;
    product_name: string;
    movement_count: number;
    net_change: number;
  }>;
  
  recent_large_movements: InventoryMovement[];
  pending_approvals: InventoryMovement[];
}

export interface StockAuditItem {
  product_id: string;
  product_name: string;
  product_sku: string;
  
  system_quantity: number;
  physical_quantity?: number;
  difference?: number;
  
  last_movement_date: string;
  last_movement_type: string;
  movement_count_30days: number;
  
  status: 'match' | 'discrepancy' | 'not_counted';
  audit_notes?: string;
  audited_by?: string;
  audited_at?: string;
}