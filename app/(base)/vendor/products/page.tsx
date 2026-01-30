'use client';

import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { Edit2, Eye, EyeOff, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
  status: 'Active' | 'Draft';
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Whey Protein Powder',
    category: 'Supplements',
    price: 29.99,
    stock: 145,
    sales: 456,
    status: 'Active',
  },
  {
    id: '2',
    name: 'Creatine Monohydrate',
    category: 'Supplements',
    price: 19.99,
    stock: 89,
    sales: 234,
    status: 'Active',
  },
  {
    id: '3',
    name: 'BCAA Energy Drink',
    category: 'Supplements',
    price: 14.99,
    stock: 0,
    sales: 178,
    status: 'Active',
  },
  {
    id: '4',
    name: 'Fat Burner Capsules',
    category: 'Supplements',
    price: 24.99,
    stock: 56,
    sales: 89,
    status: 'Draft',
  },
];

export default function VendorProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Draft'>(
    'All',
  );

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'All' || product.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

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
      </Card>
    </div>
  );
}
