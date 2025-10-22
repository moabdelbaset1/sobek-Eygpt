"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Package,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Calendar,
  MapPin,
  BarChart3,
  Clock,
  RefreshCw
} from "lucide-react"
import type { ProductInventorySummary } from "@/types/inventory"

interface ProductInventoryDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  productId: string | null
  productName?: string
}

export default function ProductInventoryDetailsModal({
  open,
  onOpenChange,
  productId,
  productName
}: ProductInventoryDetailsModalProps) {
  const [data, setData] = useState<ProductInventorySummary | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open && productId) {
      fetchProductDetails()
    }
  }, [open, productId])

  const fetchProductDetails = async () => {
    if (!productId) return

    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/admin/inventory-analytics?productId=${productId}`)
      const result = await response.json()
      
      if (result.success) {
        setData(result.data)
      } else {
        setError(result.error || 'Failed to fetch product details')
      }
    } catch (err) {
      setError('Network error occurred')
      console.error('Error fetching product details:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStockStatusColor = (currentStock: number, reorderPoint: number) => {
    if (currentStock === 0) return 'destructive'
    if (currentStock <= reorderPoint) return 'secondary'
    return 'default'
  }

  const getStockStatusText = (currentStock: number, reorderPoint: number) => {
    if (currentStock === 0) return 'Out of Stock'
    if (currentStock <= reorderPoint) return 'Low Stock'
    return 'In Stock'
  }

  const getSalesVelocityColor = (velocity: string) => {
    switch (velocity) {
      case 'fast': return 'text-green-600'
      case 'medium': return 'text-blue-600'
      case 'slow': return 'text-amber-600'
      case 'stagnant': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getSalesVelocityIcon = (velocity: string) => {
    switch (velocity) {
      case 'fast': return <TrendingUp className="h-4 w-4" />
      case 'medium': return <BarChart3 className="h-4 w-4" />
      case 'slow': case 'stagnant': return <TrendingDown className="h-4 w-4" />
      default: return <BarChart3 className="h-4 w-4" />
    }
  }

  const getMovementTypeColor = (type: string) => {
    switch (type) {
      case 'in': return 'text-green-600'
      case 'out': return 'text-red-600'
      case 'reserved': return 'text-blue-600'
      case 'unreserved': return 'text-blue-400'
      case 'adjustment': return 'text-amber-600'
      default: return 'text-gray-600'
    }
  }

  const getMovementTypeText = (type: string) => {
    switch (type) {
      case 'in': return 'Stock In'
      case 'out': return 'Stock Out'
      case 'reserved': return 'Reserved'
      case 'unreserved': return 'Unreserved'
      case 'adjustment': return 'Adjustment'
      default: return type
    }
  }

  if (!open) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Inventory Details: {productName || 'Product'}
          </DialogTitle>
          <DialogDescription>
            Comprehensive inventory tracking and sales analytics
          </DialogDescription>
        </DialogHeader>

        {loading && (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin mr-2" />
            Loading inventory details...
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-8">
            <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
            <span className="text-red-600">{error}</span>
            <Button variant="outline" onClick={fetchProductDetails} className="ml-4">
              Try Again
            </Button>
          </div>
        )}

        {data && (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
              <TabsTrigger value="movements">Stock Movements</TabsTrigger>
              <TabsTrigger value="alerts">Alerts & Warnings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* Quick Stats */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Current Stock</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{data.inventory.currentStock}</div>
                    <Badge 
                      variant={getStockStatusColor(data.inventory.currentStock, data.inventory.reorderPoint)}
                      className="text-xs"
                    >
                      {getStockStatusText(data.inventory.currentStock, data.inventory.reorderPoint)}
                    </Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Available</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{data.inventory.availableStock}</div>
                    <p className="text-xs text-muted-foreground">
                      {data.inventory.reservedStock} reserved
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Stock Value</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(data.inventory.stockValue)}</div>
                    <p className="text-xs text-muted-foreground">
                      @ {formatCurrency(data.product.costPrice)} each
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales Velocity</CardTitle>
                    {getSalesVelocityIcon(data.sales.salesVelocity)}
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold capitalize ${getSalesVelocityColor(data.sales.salesVelocity)}`}>
                      {data.sales.salesVelocity}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {data.sales.averageSalesPerDay.toFixed(1)}/day avg
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Warehouse Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Warehouse Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 md:grid-cols-2">
                    <div>
                      <span className="text-sm font-medium">Location:</span>
                      <span className="ml-2">{data.warehouse.location}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Section:</span>
                      <span className="ml-2">{data.warehouse.section}</span>
                    </div>
                    {data.warehouse.shelf && (
                      <div>
                        <span className="text-sm font-medium">Shelf:</span>
                        <span className="ml-2">{data.warehouse.shelf}</span>
                      </div>
                    )}
                    {data.warehouse.bin && (
                      <div>
                        <span className="text-sm font-medium">Bin:</span>
                        <span className="ml-2">{data.warehouse.bin}</span>
                      </div>
                    )}
                    {data.warehouse.barcode && (
                      <div>
                        <span className="text-sm font-medium">Barcode:</span>
                        <span className="ml-2 font-mono">{data.warehouse.barcode}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Reorder Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Reorder Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 md:grid-cols-3">
                    <div>
                      <span className="text-sm font-medium">Reorder Point:</span>
                      <span className="ml-2 text-amber-600 font-medium">{data.inventory.reorderPoint}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Min Stock:</span>
                      <span className="ml-2">{data.inventory.minStock}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Max Stock:</span>
                      <span className="ml-2">{data.inventory.maxStock}</span>
                    </div>
                  </div>
                  {data.inventory.lastRestockDate && (
                    <div className="mt-2">
                      <span className="text-sm font-medium">Last Restock:</span>
                      <span className="ml-2">{formatDate(data.inventory.lastRestockDate)}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sales" className="space-y-4">
              {/* Sales Overview */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Sold</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{data.sales.totalSold}</div>
                    <p className="text-xs text-muted-foreground">All time</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">This Month</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{data.sales.soldThisMonth}</div>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(data.sales.revenue.thisMonth)} revenue
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">This Week</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{data.sales.soldThisWeek}</div>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(data.sales.revenue.thisWeek)} revenue
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Today</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{data.sales.soldToday}</div>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(data.sales.revenue.today)} revenue
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Revenue Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Revenue Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Total Revenue (All Time):</span>
                      <span className="font-bold text-lg">{formatCurrency(data.sales.revenue.total)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>This Year:</span>
                      <span className="font-medium">{formatCurrency(data.sales.revenue.thisYear)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>This Month:</span>
                      <span className="font-medium">{formatCurrency(data.sales.revenue.thisMonth)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>This Week:</span>
                      <span className="font-medium">{formatCurrency(data.sales.revenue.thisWeek)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Today:</span>
                      <span className="font-medium">{formatCurrency(data.sales.revenue.today)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {data.sales.lastSaleDate && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Last Sale
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{formatDate(data.sales.lastSaleDate)}</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="movements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Recent Stock Movements
                  </CardTitle>
                  <CardDescription>Last 10 stock movements for this product</CardDescription>
                </CardHeader>
                <CardContent>
                  {data.recentMovements.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Stock Before</TableHead>
                          <TableHead>Stock After</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Reference</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.recentMovements.map((movement) => (
                          <TableRow key={movement.id}>
                            <TableCell className="text-sm">
                              {formatDate(movement.createdAt)}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getMovementTypeColor(movement.type)}>
                                {getMovementTypeText(movement.type)}
                              </Badge>
                            </TableCell>
                            <TableCell className={`font-medium ${
                              movement.type === 'in' || movement.type === 'unreserved' 
                                ? 'text-green-600' 
                                : 'text-red-600'
                            }`}>
                              {movement.type === 'in' || movement.type === 'unreserved' ? '+' : '-'}
                              {Math.abs(movement.quantity)}
                            </TableCell>
                            <TableCell>{movement.previousStock}</TableCell>
                            <TableCell className="font-medium">{movement.newStock}</TableCell>
                            <TableCell>{movement.reason}</TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {movement.reference || '-'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No stock movements recorded yet
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Active Alerts
                  </CardTitle>
                  <CardDescription>Current inventory alerts and warnings</CardDescription>
                </CardHeader>
                <CardContent>
                  {data.alerts.length > 0 ? (
                    <div className="space-y-3">
                      {data.alerts.map((alert) => (
                        <div key={alert.id} className="border rounded-lg p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-2">
                              <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                                alert.severity === 'critical' ? 'text-red-500' :
                                alert.severity === 'warning' ? 'text-amber-500' : 'text-blue-500'
                              }`} />
                              <div>
                                <div className="flex items-center gap-2">
                                  <Badge variant={
                                    alert.severity === 'critical' ? 'destructive' :
                                    alert.severity === 'warning' ? 'secondary' : 'outline'
                                  }>
                                    {alert.severity}
                                  </Badge>
                                  <Badge variant="outline">{alert.type}</Badge>
                                </div>
                                <p className="text-sm mt-1">{alert.message}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Current Stock: {alert.currentStock} | Threshold: {alert.threshold}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Created: {formatDate(alert.createdAt)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No active alerts for this product
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  )
}