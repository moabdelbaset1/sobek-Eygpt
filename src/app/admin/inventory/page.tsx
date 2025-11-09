import { useEffect, useState } from 'react';
import { createClient } from '@/lib/appwrite';
import { Query } from 'node-appwrite';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Download } from 'lucide-react';

interface InventoryRecord {
  product_id: string;
  product_name: string;
  total_stock: number;
  reserved_stock: number;
  available_stock: number;
  total_sold: number;
  total_returned: number;
  updated_at: string;
}

interface MovementRecord {
  id: string;
  product_id: string;
  product_name: string;
  type: 'reserved' | 'unreserved' | 'sale' | 'return';
  quantity: number;
  previous_stock: number;
  new_stock: number;
  order_id?: string;
  created_at: string;
}

export default function InventoryPage() {
  const [products, setProducts] = useState<InventoryRecord[]>([]);
  const [movements, setMovements] = useState<MovementRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [downloadingExcel, setDownloadingExcel] = useState(false);

  useEffect(() => {
    const databases = createClient().databases;
    const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';

    const fetchData = async () => {
      try {
        // Fetch products
        const productsResponse = await databases.listDocuments(
          DATABASE_ID,
          'products',
          [Query.limit(100)]
        );

        // Fetch movements
        const movementsResponse = await databases.listDocuments(
          DATABASE_ID,
          'inventory_movements',
          [Query.orderDesc('created_at'), Query.limit(100)]
        );

        // Calculate totals for each product
        const productTotals = productsResponse.documents.map((product: any) => {
          const productMovements = movementsResponse.documents.filter(
            (m: any) => m.product_id === product.$id
          );

          const totalSold = productMovements
            .filter((m: any) => m.type === 'sale')
            .reduce((sum: number, m: any) => sum + m.quantity, 0);

          const totalReturned = productMovements
            .filter((m: any) => m.type === 'return')
            .reduce((sum: number, m: any) => sum + m.quantity, 0);

          return {
            product_id: product.$id,
            product_name: product.name,
            total_stock: product.units || product.stockQuantity || 0,
            reserved_stock: product.reserved || 0,
            available_stock: (product.units || product.stockQuantity || 0) - (product.reserved || 0),
            total_sold: totalSold,
            total_returned: totalReturned,
            updated_at: product.$updatedAt
          };
        });

        setProducts(productTotals);
        setMovements(movementsResponse.documents as MovementRecord[]);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.product_id.toLowerCase().includes(searchTerm.toLowerCase());

    if (statusFilter === 'all') return matchesSearch;
    if (statusFilter === 'in_stock') return matchesSearch && product.available_stock > 0;
    if (statusFilter === 'low_stock') return matchesSearch && product.available_stock <= 5;
    if (statusFilter === 'out_of_stock') return matchesSearch && product.available_stock === 0;
    return matchesSearch;
  });

  const downloadExcel = async () => {
    setDownloadingExcel(true);
    try {
      // Implementation of Excel download...
      // You can use a library like xlsx to generate the Excel file
    } catch (error) {
      console.error('Error downloading Excel:', error);
    } finally {
      setDownloadingExcel(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
        <p className="text-gray-600">Track product stock levels and movement history</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="in_stock">In Stock</SelectItem>
            <SelectItem value="low_stock">Low Stock</SelectItem>
            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={downloadExcel}
          disabled={downloadingExcel}
          className="ml-auto"
        >
          {downloadingExcel ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          Export to Excel
        </Button>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Total Stock</TableHead>
                  <TableHead>Reserved</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Total Sold</TableHead>
                  <TableHead>Total Returned</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.product_id}>
                    <TableCell className="font-medium">
                      {product.product_name}
                      <div className="text-sm text-gray-500">
                        ID: {product.product_id}
                      </div>
                    </TableCell>
                    <TableCell>{product.total_stock}</TableCell>
                    <TableCell>{product.reserved_stock}</TableCell>
                    <TableCell>{product.available_stock}</TableCell>
                    <TableCell>{product.total_sold}</TableCell>
                    <TableCell>{product.total_returned}</TableCell>
                    <TableCell>
                      {new Date(product.updated_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Movements History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Movements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Previous Stock</TableHead>
                  <TableHead>New Stock</TableHead>
                  <TableHead>Order ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movements.map((movement) => (
                  <TableRow key={movement.id}>
                    <TableCell>
                      {new Date(movement.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell className="font-medium">
                      {movement.product_name}
                    </TableCell>
                    <TableCell>
                      <span className={`
                        px-2 py-1 rounded-full text-xs font-semibold
                        ${movement.type === 'sale' ? 'bg-red-100 text-red-800' :
                          movement.type === 'return' ? 'bg-green-100 text-green-800' :
                          movement.type === 'reserved' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'}
                      `}>
                        {movement.type}
                      </span>
                    </TableCell>
                    <TableCell>{movement.quantity}</TableCell>
                    <TableCell>{movement.previous_stock}</TableCell>
                    <TableCell>{movement.new_stock}</TableCell>
                    <TableCell>
                      {movement.order_id || '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}