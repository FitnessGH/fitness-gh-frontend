'use client';

import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@ui/dialog';
import { Input } from '@ui/input';
import { Coins, Package, Plus, ShoppingCart, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function VendorDashboard() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
  });

  const handleAddProduct = () => {
    console.log('[v0] Adding product:', formData);
    setFormData({ name: '', price: '', category: '' });
    setIsAddProductOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Vendor Dashboard</h1>
        <p className="text-muted-foreground">Manage your products and orders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Orders',
            value: '156',
            icon: ShoppingCart,
            color: 'bg-blue-100 text-blue-600',
          },
          {
            label: 'Products Listed',
            value: '24',
            icon: Package,
            color: 'bg-green-100 text-green-600',
          },
          {
            label: 'Revenue',
            value: 'GH₵3,240',
            icon: Coins,
            color: 'bg-purple-100 text-purple-600',
          },
          {
            label: 'Growth',
            value: '+12%',
            icon: TrendingUp,
            color: 'bg-orange-100 text-orange-600',
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card
              key={i}
              className="p-4 border-border/50 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-2 text-foreground">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 border-border/50">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Recent Orders
          </h2>
          <div className="space-y-4">
            {[
              {
                id: '#ORD-001',
                items: 3,
                amount: 'GH₵245',
                status: 'Pending',
              },
              { id: '#ORD-002', items: 2, amount: 'GH₵120', status: 'Shipped' },
              {
                id: '#ORD-003',
                items: 5,
                amount: 'GH₵890',
                status: 'Delivered',
              },
            ].map((order, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30"
              >
                <div>
                  <p className="font-medium text-foreground">{order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.items} items
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">
                    {order.amount}
                  </p>
                  <p
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-border/50">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Quick Actions
          </h2>
          <div className="space-y-2">
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-primary/10 text-primary font-medium transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-primary/10 text-primary font-medium transition-colors">
              View Orders
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-primary/10 text-primary font-medium transition-colors">
              Manage Inventory
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-primary/10 text-primary font-medium transition-colors">
              Payment Settings
            </button>
          </div>
        </Card>
      </div>

      <Dialog
        open={isAddProductOpen}
        onOpenChange={setIsAddProductOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Product Name</label>
              <Input
                placeholder="Enter product name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Price</label>
              <Input
                type="number"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <Input
                placeholder="e.g., Supplements"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setIsAddProductOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddProduct}
                className="bg-primary hover:bg-primary/90"
              >
                Add Product
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
