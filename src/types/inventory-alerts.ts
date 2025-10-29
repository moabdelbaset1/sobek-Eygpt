import { InventoryMovement } from './inventory-movements';

// Inventory Alert Types
export interface LowStockAlert {
  product_id: string;
  product_name: string;
  product_sku?: string;
  current_stock: number;
  minimum_stock: number;
  alert_level: 'low' | 'critical' | 'out_of_stock';
  last_movement: string;
  category?: string;
  supplier?: string;
  cost_per_unit?: number;
  total_value?: number;
}

export interface StockAlertSettings {
  low_stock_threshold: number;
  critical_stock_threshold: number;
  enable_notifications: boolean;
  notification_emails: string[];
  check_frequency: 'hourly' | 'daily' | 'weekly';
  auto_reorder_enabled: boolean;
}

export interface AlertStats {
  total_alerts: number;
  critical_alerts: number;
  out_of_stock: number;
  low_stock: number;
  alerts_by_category: Record<string, number>;
  total_affected_value: number;
  alerts_this_week: number;
  alerts_trend: 'increasing' | 'decreasing' | 'stable';
}

export interface NotificationRecord {
  $id: string;
  $createdAt: string;
  type: 'low_stock' | 'critical_stock' | 'out_of_stock' | 'movement_alert';
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  data: string; // JSON stringified alert data
  read: boolean;
  created_at: string;
  expires_at: string;
  action_taken?: boolean;
  action_notes?: string;
}

// Inventory Movement Enhancements
export interface EnhancedInventoryMovement extends InventoryMovement {
  cost_impact?: number;
  supplier_id?: string;
  supplier_name?: string;
  batch_number?: string;
  expiry_date?: string;
  location?: string;
  approval_required?: boolean;
  approved_by?: string;
  approved_at?: string;
}

// Bulk Operations
export interface BulkInventoryOperation {
  operation_type: 'adjustment' | 'restock' | 'transfer' | 'mark_damaged';
  products: Array<{
    product_id: string;
    quantity_change: number;
    reason?: string;
    notes?: string;
  }>;
  created_by: string;
  created_by_name: string;
  batch_reference?: string;
  requires_approval?: boolean;
}

export interface BulkOperationResult {
  success: boolean;
  processed_count: number;
  failed_count: number;
  errors: Array<{
    product_id: string;
    error: string;
  }>;
  batch_id?: string;
}

// Inventory Reports
export interface InventoryReport {
  report_id: string;
  report_type: 'movement_summary' | 'stock_valuation' | 'alert_history' | 'audit_trail';
  date_range: {
    from: string;
    to: string;
  };
  filters: Record<string, any>;
  generated_at: string;
  generated_by: string;
  data: any;
  format: 'json' | 'excel' | 'pdf';
  file_url?: string;
}

export interface ProductHistory {
  product_id: string;
  product_name: string;
  movements: InventoryMovement[];
  stock_timeline: Array<{
    date: string;
    stock_level: number;
    change_reason: string;
  }>;
  alerts_history: LowStockAlert[];
  reorder_suggestions: Array<{
    suggested_quantity: number;
    reason: string;
    urgency: 'low' | 'medium' | 'high';
  }>;
}

// Dashboard Widgets
export interface InventoryDashboardWidget {
  widget_id: string;
  title: string;
  type: 'chart' | 'stat' | 'alert' | 'table';
  data: any;
  refresh_interval?: number;
  last_updated: string;
}

export interface InventoryDashboardConfig {
  widgets: InventoryDashboardWidget[];
  layout: Array<{
    widget_id: string;
    position: { x: number; y: number; w: number; h: number };
  }>;
  auto_refresh: boolean;
  refresh_interval: number;
}