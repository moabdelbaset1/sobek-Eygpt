"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Package, 
  ShoppingCart, 
  DollarSign, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Warehouse,
  BarChart3,
  Target,
  Clock
} from "lucide-react"
import type { EnhancedProductStats, InventoryOverview } from "@/types/inventory"

interface InventoryStatsCardsProps {
  stats: EnhancedProductStats
  overview?: InventoryOverview
  loading?: boolean
}

export default function InventoryStatsCards({ stats, overview, loading }: InventoryStatsCardsProps) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              </CardTitle>
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-1" />
              <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {/* Total Products */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(stats.total)}</div>
          <p className="text-xs text-muted-foreground">
            {stats.available} active, {stats.unavailable} inactive
          </p>
        </CardContent>
      </Card>

      {/* Inventory Value */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.totalValue)}</div>
          <p className="text-xs text-muted-foreground">
            Total stock value
          </p>
        </CardContent>
      </Card>

      {/* Sales Performance */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sold</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(stats.totalSold)}</div>
          <p className="text-xs text-muted-foreground">
            {formatCurrency(stats.totalRevenue)} revenue
          </p>
        </CardContent>
      </Card>

      {/* Stock Alerts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Stock Alerts</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-600">{stats.criticalAlerts}</div>
          <div className="flex gap-2 text-xs">
            <Badge variant="destructive" className="text-xs">
              {stats.outOfStock} out
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {stats.lowStock} low
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Movement Analysis */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Movement Speed</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-xl font-bold text-green-600">{stats.fastMovers}</span>
            <span className="text-sm text-muted-foreground">fast</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-red-600" />
            <span className="text-xl font-bold text-red-600">{stats.slowMovers}</span>
            <span className="text-sm text-muted-foreground">slow</span>
          </div>
        </CardContent>
      </Card>

      {/* Reserved Stock */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Reserved Stock</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{formatNumber(stats.reservedStock)}</div>
          <p className="text-xs text-muted-foreground">
            Units in pending orders
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

// Detailed Overview Cards (if overview data is available)
export function InventoryOverviewCards({ overview, loading }: { overview?: InventoryOverview, loading?: boolean }) {
  if (!overview || loading) return null

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
      {/* Warehouse Status */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Warehouse Status</CardTitle>
          <Warehouse className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Available:</span>
              <span className="font-medium text-green-600">{overview.totalAvailable}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Reserved:</span>
              <span className="font-medium text-blue-600">{overview.totalReserved}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Overstock:</span>
              <span className="font-medium text-amber-600">{overview.overstockCount}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Movements</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Today:</span>
              <span className="font-medium">{overview.totalMovements.today}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">This Week:</span>
              <span className="font-medium">{overview.totalMovements.thisWeek}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">This Month:</span>
              <span className="font-medium">{overview.totalMovements.thisMonth}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert Summary */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Alert Summary</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Badge variant="destructive" className="text-xs">Critical</Badge>
              <span className="font-medium">{overview.alerts.critical}</span>
            </div>
            <div className="flex justify-between">
              <Badge variant="secondary" className="text-xs">Warning</Badge>
              <span className="font-medium">{overview.alerts.warning}</span>
            </div>
            <div className="flex justify-between">
              <Badge variant="outline" className="text-xs">Info</Badge>
              <span className="font-medium">{overview.alerts.info}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Performance</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Turnover Rate:</span>
              <span className="font-medium">12.5%</span>
            </div>
            <div className="flex justify-between">
              <span>Fill Rate:</span>
              <span className="font-medium text-green-600">96.2%</span>
            </div>
            <div className="flex justify-between">
              <span>Accuracy:</span>
              <span className="font-medium text-green-600">99.1%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}