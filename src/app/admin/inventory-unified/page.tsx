'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Package, 
  Search, 
  RefreshCw,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Eye,
  ChevronDown
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface InventoryItem {
  id: string
  customProductId: string
  name: string
  brandName: string
  quantityOut: number
  quantityRemaining: number
  status: 'in' | 'out' | 'low_stock' | 'alert'
  location?: string
  lastUpdated?: string
}

export default function UnifiedInventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  useEffect(() => {
    fetchInventoryData()
  }, [])

  const fetchInventoryData = async () => {
    try {
      setLoading(true)
      
      // Fetch unified inventory overview from server
      const res = await fetch('/api/admin/inventory-overview?limit=1000')
      if (res.ok) {
        const data = await res.json()
        // The API returns { items: InventoryItem[] }
        setItems(data.items || [])
      } else {
        console.warn('Inventory overview API returned non-ok status')
        setItems([])
      }
    } catch (error) {
      console.error('Error fetching inventory data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.customProductId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brandName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = 
      filterType === 'all' ||
      item.status === filterType

    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'alert':
      case 'out_of_stock':
        return 'bg-red-100 text-red-800'
      case 'low_stock':
        return 'bg-yellow-100 text-yellow-800'
      case 'in':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'alert':
      case 'out_of_stock':
        return <AlertTriangle className="h-4 w-4" />
      case 'low_stock':
        return <TrendingDown className="h-4 w-4" />
      case 'in':
        return <TrendingUp className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'alert':
      case 'out_of_stock':
        return 'Out of Stock'
      case 'low_stock':
        return 'Low Stock'
      case 'in':
        return 'In Stock'
      default:
        return status
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-start md:items-center gap-4 flex-col md:flex-row">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="h-8 w-8 text-blue-600" />
              Inventory Management
            </h1>
            <p className="text-gray-600 mt-2">Track products, movements, alerts and audit in one place</p>
          </div>
          <Button 
            onClick={fetchInventoryData}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-3xl font-bold text-gray-900">{items.length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600">In Stock</p>
              <p className="text-3xl font-bold text-green-600">{items.filter(i => i.status === 'in').length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600">Low Stock</p>
              <p className="text-3xl font-bold text-yellow-600">{items.filter(i => i.status === 'low_stock').length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600">Out of Stock</p>
              <p className="text-3xl font-bold text-red-600">{items.filter(i => i.status === 'alert').length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by ID, Product Name, or Brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="in">In Stock</SelectItem>
              <SelectItem value="low_stock">Low Stock</SelectItem>
              <SelectItem value="alert">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Main Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Inventory Overview ({filteredItems.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">ID</TableHead>
                      <TableHead className="font-semibold">Product Name</TableHead>
                      <TableHead className="font-semibold">Brand</TableHead>
                      <TableHead className="font-semibold text-center">Quantity Out</TableHead>
                      <TableHead className="font-semibold text-center">Remaining</TableHead>
                      <TableHead className="font-semibold">Location</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                          No inventory items found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredItems.map((item) => (
                        <React.Fragment key={item.id}>
                          <TableRow className="hover:bg-gray-50 transition-colors">
                            <TableCell className="font-mono font-bold text-blue-600">
                              {item.customProductId}
                            </TableCell>
                            <TableCell>
                              <p className="font-medium text-gray-900">{item.name}</p>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{item.brandName}</Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className="text-red-600 font-bold">{item.quantityOut}</span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className="text-green-600 font-bold">{item.quantityRemaining}</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-gray-600">{item.location}</span>
                            </TableCell>
                            <TableCell>
                              <Badge className={`flex items-center gap-1 w-fit ${getStatusColor(item.status)}`}>
                                {getStatusIcon(item.status)}
                                {getStatusLabel(item.status)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setExpandedRow(expandedRow === item.id ? null : item.id)}
                                className="hover:bg-gray-200"
                              >
                                <ChevronDown className={`h-4 w-4 transition-transform ${expandedRow === item.id ? 'rotate-180' : ''}`} />
                              </Button>
                            </TableCell>
                          </TableRow>
                          
                          {/* Expanded Details */}
                          {expandedRow === item.id && (
                            <TableRow className="bg-blue-50">
                              <TableCell colSpan={8} className="py-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-600">Total Out</p>
                                    <p className="text-lg font-bold text-red-600">{item.quantityOut}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">Total Remaining</p>
                                    <p className="text-lg font-bold text-green-600">{item.quantityRemaining}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">Total Available</p>
                                    <p className="text-lg font-bold text-blue-600">{item.quantityOut + item.quantityRemaining}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">Last Updated</p>
                                    <p className="text-sm text-gray-700">{new Date(item.lastUpdated || '').toLocaleDateString('en-US')}</p>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>Column Explanation:</strong>
            <br />
            <strong>ID:</strong> Custom Product ID (manually assigned)
            <br />
            <strong>Product Name:</strong> Product name from database
            <br />
            <strong>Brand:</strong> Product brand
            <br />
            <strong>Quantity Out:</strong> Total units sold/moved out
            <br />
            <strong>Remaining:</strong> Units currently in stock
            <br />
            <strong>Location:</strong> Current storage location
            <br />
            <strong>Status:</strong> Stock status (In Stock, Low Stock, Out of Stock)
          </p>
        </div>
      </div>
    </div>
  )
}
