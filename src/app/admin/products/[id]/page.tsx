"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { 
  ArrowLeft, 
  Edit, 
  Package, 
  DollarSign, 
  Eye, 
  EyeOff,
  Calendar,
  Tag,
  Warehouse,
  RefreshCw
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Product } from "@/types/product"

export default function ProductViewPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const productId = params?.id as string

  useEffect(() => {
    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/products/${productId}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      setProduct(data.product)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch product'
      console.error("Failed to fetch product:", message)
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const toggleAvailability = async () => {
    if (!product) return
    
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_active: !product.is_active
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to update product')
      }
      
      const data = await response.json()
      setProduct(data.product)
      alert(`Product ${product.is_active ? 'deactivated' : 'activated'} successfully!`)
      
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update product'
      console.error("Failed to update product:", message)
      alert('Error: ' + message)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center">
          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          Loading product...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">{error}</p>
            <div className="mt-4 space-x-2">
              <Button onClick={fetchProduct} variant="outline">
                Try Again
              </Button>
              <Button onClick={() => router.push('/admin/products')} variant="outline">
                Back to Products
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Product Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The product you're looking for doesn't exist.</p>
            <Button onClick={() => router.push('/admin/products')} className="mt-4">
              Back to Products
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button onClick={() => router.push('/admin/products')} variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground">SKU: {product.sku}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={product.is_active ? "default" : "secondary"}>
            {product.is_active ? "Active" : "Inactive"}
          </Badge>
          <Button onClick={toggleAvailability} variant="outline">
            {product.is_active ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
            {product.is_active ? "Deactivate" : "Activate"}
          </Button>
          <Link href={`/admin/products/${product.$id}/edit`}>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit Product
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Images */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {product.mainImageUrl && (
                  <div className="aspect-square relative">
                    <Image
                      src={product.mainImageUrl}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
                {product.backImageUrl && (
                  <div className="aspect-square relative">
                    <Image
                      src={product.backImageUrl}
                      alt={`${product.name} back view`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
                {product.galleryImages && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="aspect-square relative bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Product Name</label>
                  <p className="text-lg font-semibold">{product.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">SKU</label>
                  <p className="text-lg font-semibold">{product.sku}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Brand ID</label>
                  <p className="text-lg">{product.brand_id || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Category ID</label>
                  <p className="text-lg">{product.category_id || 'N/A'}</p>
                </div>
              </div>
              
              {product.description && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Description</label>
                  <p className="mt-2 text-sm leading-relaxed">{product.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pricing & Inventory */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <DollarSign className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-xl font-bold">${product.price}</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Package className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <p className="text-sm text-muted-foreground">Units</p>
                  <p className="text-xl font-bold">{product.units}</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Warehouse className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                  <p className="text-sm text-muted-foreground">Stock Quantity</p>
                  <p className="text-xl font-bold">{product.stockQuantity || 0}</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Tag className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant={product.is_active ? "default" : "secondary"}>
                    {product.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Variations */}
          {product.variations && product.variations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Product Variations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {product.variations.map((variation: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{variation.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {variation.options?.join(', ') || 'No options'}
                        </p>
                      </div>
                      <Badge variant="outline">{variation.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Timestamps */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Created:</span>
                  <span className="text-sm">{new Date(product.$createdAt).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Updated:</span>
                  <span className="text-sm">{new Date(product.$updatedAt).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}