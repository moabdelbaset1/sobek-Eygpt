// Enhanced Inventory Management Types
// For detailed warehouse tracking and sales analytics

export interface InventoryDetails {
  productId: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number; // currentStock - reservedStock
  reorderPoint: number;
  maxStock: number;
  minStock: number;
  lastRestockDate?: string;
  nextRestockDate?: string;
  stockValue: number; // currentStock * costPrice
}

export interface SalesAnalytics {
  productId: string;
  totalSold: number;
  soldToday: number;
  soldThisWeek: number;
  soldThisMonth: number;
  soldThisYear: number;
  lastSaleDate?: string;
  averageSalesPerDay: number;
  salesVelocity: 'fast' | 'medium' | 'slow' | 'stagnant';
  revenue: {
    total: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
    thisYear: number;
  };
}

export interface StockMovement {
  id: string;
  productId: string;
  type: 'in' | 'out' | 'adjustment' | 'reserved' | 'unreserved';
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  reference?: string; // Order ID, PO number, etc
  notes?: string;
  createdBy: string;
  createdAt: string;
}

export interface InventoryAlert {
  id: string;
  productId: string;
  productName: string;
  type: 'low-stock' | 'out-of-stock' | 'overstock' | 'reorder-needed';
  severity: 'critical' | 'warning' | 'info';
  message: string;
  currentStock: number;
  threshold: number;
  createdAt: string;
  resolved: boolean;
  resolvedAt?: string;
}

export interface WarehouseInfo {
  location: string;
  section: string;
  shelf?: string;
  bin?: string;
  barcode?: string;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    weight: number;
  };
}

export interface ProductInventorySummary {
  product: {
    id: string;
    name: string;
    sku: string;
    price: number;
    costPrice: number;
    category: string;
    brand: string;
  };
  inventory: InventoryDetails;
  sales: SalesAnalytics;
  alerts: InventoryAlert[];
  warehouse: WarehouseInfo;
  recentMovements: StockMovement[];
}

export interface InventoryOverview {
  totalProducts: number;
  totalValue: number;
  lowStockCount: number;
  outOfStockCount: number;
  overstockCount: number;
  totalReserved: number;
  totalAvailable: number;
  totalMovements: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  alerts: {
    critical: number;
    warning: number;
    info: number;
  };
}

export interface InventoryReportData {
  overview: InventoryOverview;
  products: ProductInventorySummary[];
  topSellers: Array<{
    productId: string;
    productName: string;
    totalSold: number;
    revenue: number;
  }>;
  slowMovers: Array<{
    productId: string;
    productName: string;
    daysSinceLastSale: number;
    currentStock: number;
  }>;
  profitAnalysis: Array<{
    productId: string;
    productName: string;
    profit: number;
    profitMargin: number;
  }>;
}

// Enhanced Product Stats for Admin Dashboard
export interface EnhancedProductStats {
  total: number;
  available: number;
  unavailable: number;
  onSale: number;
  lowStock: number;
  outOfStock: number;
  totalValue: number;
  totalSold: number;
  totalRevenue: number;
  averageMargin: number;
  fastMovers: number;
  slowMovers: number;
  criticalAlerts: number;
  reservedStock: number;
}

// Filter types for inventory views
export interface InventoryFilters {
  stockStatus?: 'all' | 'in-stock' | 'low-stock' | 'out-of-stock' | 'overstock';
  salesVelocity?: 'all' | 'fast' | 'medium' | 'slow' | 'stagnant';
  alertLevel?: 'all' | 'critical' | 'warning' | 'info' | 'none';
  warehouseLocation?: string;
  dateFrom?: string;
  dateTo?: string;
  category?: string;
  brand?: string;
}

export interface InventoryTableColumn {
  key: keyof ProductInventorySummary | string;
  label: string;
  sortable: boolean;
  filterable: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}