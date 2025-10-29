"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { 
  ArrowLeft, 
  Save, 
  RefreshCw,
  Package,
  DollarSign,
  Tag,
  FileText,
  Image as ImageIcon
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Product } from "@/types/product"

export default function ProductEditPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const productId = params?.id as string

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    price: 0,
    discount_price: 0,
    units: 0,
    stockQuantity: 0,
    lowStockThreshold: 0,
    min_order_quantity: 1,
    is_active: true,
    is_featured: false,
    is_new: false,
    mainImageUrl: '',
    backImageUrl: '',
    brand_id: '',
    category_id: '',
    season: 'all-season' as 'summer' | 'winter' | 'all-season'
  })

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
      
      const fetchedProduct = data.product
      setProduct(fetchedProduct)
      
      // Initialize form data
      const extractSeasonFromMeta = (metaKeywords: string) => {
        const match = metaKeywords?.match(/season:(\w+)/);
        return match?.[1] as 'summer' | 'winter' | 'all-season' || 'all-season';
      };

      setFormData({
        name: fetchedProduct.name || '',
        sku: fetchedProduct.sku || '',
        description: fetchedProduct.description || '',
        price: fetchedProduct.price || 0,
        discount_price: fetchedProduct.discount_price || 0,
        units: fetchedProduct.units || 0,
        stockQuantity: fetchedProduct.stockQuantity || 0,
        lowStockThreshold: fetchedProduct.lowStockThreshold || 0,
        min_order_quantity: fetchedProduct.min_order_quantity || 1,
        is_active: fetchedProduct.is_active ?? true,
        is_featured: fetchedProduct.is_featured ?? false,
        is_new: fetchedProduct.is_new ?? false,
        mainImageUrl: fetchedProduct.mainImageUrl || '',
        backImageUrl: fetchedProduct.backImageUrl || '',
        brand_id: fetchedProduct.brand_id || '',
        category_id: fetchedProduct.category_id || '',
        season: extractSeasonFromMeta(fetchedProduct.meta_keywords || '')
      })
      
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch product'
      console.error("Failed to fetch product:", message)
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update product')
      }
      
      const data = await response.json()
      setProduct(data.product)
      alert('Product updated successfully!')
      router.push(`/admin/products/${productId}`)
      
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update product'
      console.error("Failed to update product:", message)
      alert('Error: ' + message)
    } finally {
      setSaving(false)
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
            <p>The product you're trying to edit doesn't exist.</p>
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
          <Button onClick={() => router.push(`/admin/products/${productId}`)} variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Product
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Edit Product</h1>
            <p className="text-muted-foreground">{product.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => router.push(`/admin/products/${productId}`)} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter product name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => handleInputChange('sku', e.target.value)}
                placeholder="Product SKU"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Product description"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="season">Product Season</Label>
              <Select value={formData.season} onValueChange={(value) => handleInputChange('season', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summer">
                    <div className="flex items-center gap-2">
                      <span>🌞</span>
                      <span>Summer / صيف</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="winter">
                    <div className="flex items-center gap-2">
                      <span>❄️</span>
                      <span>Winter / شتاء</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="all-season">
                    <div className="flex items-center gap-2">
                      <span>🌤️</span>
                      <span>All Season / كل الفصول</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brand_id">Brand ID</Label>
                <Input
                  id="brand_id"
                  value={formData.brand_id}
                  onChange={(e) => handleInputChange('brand_id', e.target.value)}
                  placeholder="Brand ID"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category_id">Category ID</Label>
                <Input
                  id="category_id"
                  value={formData.category_id}
                  onChange={(e) => handleInputChange('category_id', e.target.value)}
                  placeholder="Category ID"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Inventory */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5" />
              Pricing & Inventory
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount_price">Discount Price</Label>
                <Input
                  id="discount_price"
                  type="number"
                  value={formData.discount_price}
                  onChange={(e) => handleInputChange('discount_price', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="units">Units</Label>
                <Input
                  id="units"
                  type="number"
                  value={formData.units}
                  onChange={(e) => handleInputChange('units', parseInt(e.target.value) || 0)}
                  placeholder="0"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stockQuantity">Stock Quantity</Label>
                <Input
                  id="stockQuantity"
                  type="number"
                  value={formData.stockQuantity}
                  onChange={(e) => handleInputChange('stockQuantity', parseInt(e.target.value) || 0)}
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                <Input
                  id="lowStockThreshold"
                  type="number"
                  value={formData.lowStockThreshold}
                  onChange={(e) => handleInputChange('lowStockThreshold', parseInt(e.target.value) || 0)}
                  placeholder="0"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="min_order_quantity">Min Order Quantity</Label>
                <Input
                  id="min_order_quantity"
                  type="number"
                  value={formData.min_order_quantity}
                  onChange={(e) => handleInputChange('min_order_quantity', parseInt(e.target.value) || 1)}
                  placeholder="1"
                  min="1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ImageIcon className="mr-2 h-5 w-5" />
              Product Images
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mainImageUrl">Main Image URL</Label>
              <Input
                id="mainImageUrl"
                value={formData.mainImageUrl}
                onChange={(e) => handleInputChange('mainImageUrl', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="backImageUrl">Back Image URL</Label>
              <Input
                id="backImageUrl"
                value={formData.backImageUrl}
                onChange={(e) => handleInputChange('backImageUrl', e.target.value)}
                placeholder="https://example.com/back-image.jpg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Product Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Tag className="mr-2 h-5 w-5" />
              Product Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="is_active">Active Status</Label>
                <p className="text-sm text-muted-foreground">
                  Enable this product for sale
                </p>
              </div>
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => handleInputChange('is_active', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="is_featured">Featured Product</Label>
                <p className="text-sm text-muted-foreground">
                  Show in featured products section
                </p>
              </div>
              <Switch
                id="is_featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => handleInputChange('is_featured', checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="is_new">New Product</Label>
                <p className="text-sm text-muted-foreground">
                  Mark as new arrival
                </p>
              </div>
              <Switch
                id="is_new"
                checked={formData.is_new}
                onCheckedChange={(checked) => handleInputChange('is_new', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}