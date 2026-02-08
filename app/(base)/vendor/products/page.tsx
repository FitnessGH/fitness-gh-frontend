'use client';

import { useAuth } from '@/components/auth-context';
import MarketplaceAPI, { type Product as ApiProduct, ProductStatus } from '@/lib/api/marketplace';
import { tokenStorage } from '@/lib/utils/token-storage';
import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { Edit2, Eye, EyeOff, Loader2, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales: number; // Not available in API yet
  status: 'Active' | 'Draft';
}

// Transform API product to frontend format
function transformProduct(apiProduct: ApiProduct): Product {
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    category: apiProduct.category,
    price: apiProduct.price,
    stock: apiProduct.stock,
    sales: 0, // TODO: Calculate from orders when available
    status: apiProduct.status === 'ACTIVE' ? 'Active' : 'Draft',
  };
}

export default function VendorProductsPage() {
  const { isLoading: authLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Draft'>(
    'All',
  );

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      if (authLoading) {
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const apiProducts = await MarketplaceAPI.getMyProducts();
        const transformedProducts = apiProducts.map(transformProduct);
        setProducts(transformedProducts);
      } catch (err: any) {
        console.error('Failed to fetch products:', err);
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [authLoading]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'All' || product.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await MarketplaceAPI.deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err: any) {
      console.error('Failed to delete product:', err);
      alert(err.message || 'Failed to delete product');
    }
  };

  const handleToggleStatus = async (product: Product) => {
    try {
      const newStatus = product.status === 'Active' ? 'DRAFT' : 'ACTIVE';
      await MarketplaceAPI.updateProduct(product.id, {
        status: newStatus as ProductStatus,
      });
      
      // Refresh products
      const apiProducts = await MarketplaceAPI.getMyProducts();
      const transformedProducts = apiProducts.map(transformProduct);
      setProducts(transformedProducts);
    } catch (err: any) {
      console.error('Failed to update product status:', err);
      alert(err.message || 'Failed to update product status');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">
            {authLoading ? 'Loading...' : 'Loading products...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <p className="text-destructive font-medium">Error</p>
          <p className="text-sm text-muted-foreground mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground">Manage your product listings</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      <Card className="p-4 border-border/50">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label className="text-xs text-muted-foreground mb-2 block">
              Search
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">
              Status
            </Label>
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as 'All' | 'Active' | 'Draft')
              }
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option>All</option>
              <option>Active</option>
              <option>Draft</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-border/50 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">
                Product
              </th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">
                Category
              </th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">
                Price
              </th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">
                Stock
              </th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">
                Sales
              </th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">
                Status
              </th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b border-border/50 hover:bg-muted/30"
              >
                <td className="py-3 px-4">
                  <p className="font-medium text-foreground">{product.name}</p>
                </td>
                <td className="py-3 px-4 text-muted-foreground">
                  {product.category}
                </td>
                <td className="py-3 px-4 text-primary font-semibold">
                  ${product.price.toFixed(2)}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      product.stock > 20
                        ? 'bg-green-100 text-green-700'
                        : product.stock > 0
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="py-3 px-4 text-muted-foreground">
                  {product.sales}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      product.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      className="p-1 hover:bg-muted rounded"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4 text-muted-foreground hover:text-primary" />
                    </button>
                    <button
                      className="p-1 hover:bg-muted rounded"
                      title="Toggle visibility"
                      onClick={() => handleToggleStatus(product)}
                    >
                      {product.status === 'Active' ? (
                        <Eye className="w-4 h-4 text-muted-foreground hover:text-primary" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-muted-foreground hover:text-primary" />
                      )}
                    </button>
                    <button
                      className="p-1 hover:bg-muted rounded"
                      title="Delete"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProducts.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">
              {products.length === 0
                ? 'No products found. Click "Add Product" to create your first product.'
                : 'No products match your search criteria.'}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
