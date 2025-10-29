"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Package, 
  ShoppingCart, 
  DollarSign, 
  AlertTriangle, 
  Warehouse
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
              {stats.outOfStock} out of stock
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {stats.lowStock} low stock
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Simplified Overview Cards (optional, only if really needed)
export function InventoryOverviewCards({ overview, loading }: { overview?: InventoryOverview, loading?: boolean }) {
  if (!overview || loading) return null

  return (
    <div className="grid gap-4 md:grid-cols-2 mt-4">
      {/* Simple Warehouse Status */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Warehouse Summary</CardTitle>
          <Warehouse className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Available:</span>
              <span className="font-medium text-green-600">{overview?.totalAvailable || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Low Stock:</span>
              <span className="font-medium text-amber-600">{overview?.alerts?.warning || 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simple Alerts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Quick Alerts</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Badge variant="destructive" className="text-xs">Critical</Badge>
              <span className="font-medium">{overview?.alerts?.critical || 0}</span>
            </div>
            <div className="flex justify-between">
              <Badge variant="secondary" className="text-xs">Warning</Badge>
              <span className="font-medium">{overview?.alerts?.warning || 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}