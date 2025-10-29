"use client"

import React, { useState, useEffect } from "react"
import {
  Search,
  ChevronDown,
  ChevronUp,
  Truck,
  Package,
  CheckCircle,
  RotateCcw,
  AlertCircle,
  Loader2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Product {
  $id: string
  custom_product_id: string
  name: string
  price: number
  units: number
  brand_id: string
  brand_name?: string
  status?: string
  returned?: number
}

interface TrackedProduct extends Product {
  expanded?: boolean
  shipmentStatus?: "pending" | "shipped" | "delivered" | "returned"
  trackingInfo?: {
    shipDate?: string
    deliveryDate?: string
    carrier?: string
    trackingNumber?: string
    returnedDate?: string
  }
}

export default function ProductsTracker() {
  const [products, setProducts] = useState<TrackedProduct[]>([])
  const [brands, setBrands] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)

      // Fetch products
      const productsRes = await fetch("/api/admin/products?limit=100")
      const productsData = await productsRes.json()
      const allProducts = productsData.products || []

      // Fetch brands for mapping
      const brandsRes = await fetch("/api/admin/brands?limit=1000")
      const brandsData = await brandsRes.json()
      const allBrands = brandsData.brands || []
      setBrands(allBrands)

      // Create brand map
      const brandMap = new Map(allBrands.map((b: any) => [b.$id, b.name]))

      // Map products with brand names
      const mappedProducts: TrackedProduct[] = allProducts.map((p: any) => ({
        ...p,
        // Try different field names for custom product ID
        custom_product_id: p.custom_product_id || p.customProductId || p.custom_id || p.$id,
        brand_name: brandMap.get(p.brand_id) || p.brand_id,
        shipmentStatus: (p.status as any) || "pending",
        trackingInfo: {},
        expanded: false
      }))

      setProducts(mappedProducts)
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleRow = (productId: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(productId)) {
      newExpanded.delete(productId)
    } else {
      newExpanded.add(productId)
    }
    setExpandedRows(newExpanded)
  }

  const updateStatus = async (productId: string, newStatus: string) => {
    try {
      const updatedProducts = products.map(p => {
        if (p.$id === productId) {
          return { ...p, shipmentStatus: newStatus as any }
        }
        return p
      })
      setProducts(updatedProducts)

      // Save to localStorage (local tracking)
      localStorage.setItem(`product_status_${productId}`, newStatus)
    } catch (error) {
      console.error("Failed to update status:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "returned":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "returned":
        return <RotateCcw className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const filteredProducts = products.filter(p => {
    const matchesSearch =
      (p.custom_product_id?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (p.brand_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false)

    const matchesStatus =
      statusFilter === "all" || p.shipmentStatus === statusFilter

    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Products & Shipment Tracker</h1>
        <p className="text-gray-600">Track your products from warehouse to customer with unified inventory management</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {products.filter(p => p.shipmentStatus === "pending").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Shipped</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {products.filter(p => p.shipmentStatus === "shipped").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {products.filter(p => p.shipmentStatus === "delivered").length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-700">Returned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {products.filter(p => p.shipmentStatus === "returned").length}
            </div>
            <p className="text-xs text-red-600 mt-1">
              Click to view details
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by Product ID, Name, or Brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-48 h-10">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="returned">Returned</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={fetchData} variant="outline" className="h-10">
          Refresh
        </Button>
      </div>

      {/* Main Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8"></TableHead>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <React.Fragment key={product.$id}>
                    {/* Main Row */}
                    <TableRow key={product.$id} className="hover:bg-gray-50" data-product-id={product.$id}>
                      <TableCell>
                        <button
                          onClick={() => toggleRow(product.$id)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          {expandedRows.has(product.$id) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                      </TableCell>
                      <TableCell className="font-mono font-bold text-blue-600">
                        {product.custom_product_id || product.$id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{product.brand_name}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        ${product.price.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.units > 0 ? "default" : "destructive"}>
                          {product.units} units
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(product.shipmentStatus || "pending")}`}>
                          <span className="mr-1">
                            {getStatusIcon(product.shipmentStatus || "pending")}
                          </span>
                          {product.shipmentStatus || "pending"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={product.shipmentStatus || "pending"}
                          onValueChange={(value) => updateStatus(product.$id, value)}
                        >
                          <SelectTrigger className="w-32 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="returned">Returned</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>

                    {/* Expanded Details Row */}
                    {expandedRows.has(product.$id) && (
                      <TableRow key={`${product.$id}-expanded`} className="bg-blue-50">
                        <TableCell colSpan={8} className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Product Details */}
                            <div className="space-y-3">
                              <h3 className="font-semibold text-gray-900">Product Details</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Product ID:</span>
                                  <span className="font-mono font-bold">{product.custom_product_id || product.$id}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">System ID:</span>
                                  <span className="font-mono text-xs">{product.$id}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Name:</span>
                                  <span>{product.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Brand:</span>
                                  <span>{product.brand_name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Price:</span>
                                  <span className="font-semibold">${product.price.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Stock:</span>
                                  <span className="font-semibold">{product.units} units</span>
                                </div>
                              </div>
                            </div>

                            {/* Shipment Tracking */}
                            <div className="space-y-3">
                              <h3 className="font-semibold text-gray-900">Shipment Tracking</h3>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <label className="text-gray-600 text-xs">Current Status:</label>
                                  <div className="mt-1">
                                    <Badge className={`${getStatusColor(product.shipmentStatus || "pending")}`}>
                                      {product.shipmentStatus || "pending"}
                                    </Badge>
                                  </div>
                                </div>

                                {product.shipmentStatus === "shipped" && (
                                  <div className="space-y-2">
                                    <div>
                                      <label className="text-gray-600 text-xs">Carrier:</label>
                                      <Input
                                        placeholder="e.g., DHL, FedEx"
                                        className="h-8 text-xs mt-1"
                                        defaultValue={product.trackingInfo?.carrier || ""}
                                      />
                                    </div>
                                    <div>
                                      <label className="text-gray-600 text-xs">Tracking Number:</label>
                                      <Input
                                        placeholder="Enter tracking number"
                                        className="h-8 text-xs mt-1"
                                        defaultValue={product.trackingInfo?.trackingNumber || ""}
                                      />
                                    </div>
                                  </div>
                                )}

                                {product.shipmentStatus === "returned" && (
                                  <div className="space-y-2">
                                    <div>
                                      <label className="text-gray-600 text-xs">Return Reason:</label>
                                      <Input
                                        placeholder="Why was it returned?"
                                        className="h-8 text-xs mt-1"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-gray-600 text-xs">Return Count:</label>
                                      <div className="mt-1">
                                        <Badge variant="destructive" className="text-xs">
                                          1 return
                                        </Badge>
                                      </div>
                                    </div>
                                    <div>
                                      <label className="text-gray-600 text-xs">Action Required:</label>
                                      <div className="mt-1 space-x-2">
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => updateStatus(product.$id, "pending")}
                                          className="h-8 text-xs"
                                        >
                                          Reprocess
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => {
                                            // Here you can add logic to mark as defective
                                            console.log("Mark as defective:", product.$id)
                                          }}
                                          className="h-8 text-xs"
                                        >
                                          Mark Defective
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600">No products found</p>
          </CardContent>
        </Card>
      )}

      {/* Returned Products Summary */}
      {products.filter(p => p.shipmentStatus === "returned").length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700 flex items-center gap-2">
              <RotateCcw className="h-5 w-5" />
              Returned Products Summary ({products.filter(p => p.shipmentStatus === "returned").length})
            </CardTitle>
            <CardDescription>
              Products that have been returned by customers - requires attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {products
                .filter(p => p.shipmentStatus === "returned")
                .map((product) => (
                  <div key={`returned-${product.$id}`} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-red-100 text-red-800 font-mono">
                          {product.custom_product_id || product.$id}
                        </Badge>
                        <span className="font-medium">{product.name}</span>
                        <span className="text-sm text-gray-600">({product.brand_name})</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Price: ${product.price.toFixed(2)} | Stock: {product.units} units
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setExpandedRows(new Set([product.$id]))
                          // Scroll to product in main table
                          const element = document.querySelector(`[data-product-id="${product.$id}"]`)
                          element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                        }}
                        className="text-xs"
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStatus(product.$id, "pending")}
                        className="text-xs"
                      >
                        Reprocess
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
