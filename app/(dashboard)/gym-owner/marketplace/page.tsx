'use client';

import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { Plus, ShoppingCart } from 'lucide-react';

export default function MarketplacePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Marketplace</h1>
          <p className="text-muted-foreground">Manage products and vendors</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" />
          Add Listing
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Active Listings', value: '24' },
          { label: 'Vendor Partners', value: '8' },
          { label: 'Orders This Month', value: '156' },
        ].map((stat, i) => (
          <Card
            key={i}
            className="p-4 border-border/50"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold mt-2 text-foreground">
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-4 text-foreground">
          Featured Listings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              name: 'Protein Powder',
              vendor: 'Elite Supplements',
              price: 'GH₵29.99',
              orders: 24,
            },
            {
              name: 'Gym Bag',
              vendor: 'Fit Gear Co',
              price: 'GH₵49.99',
              orders: 18,
            },
            {
              name: 'Water Bottle',
              vendor: 'HydroMax',
              price: 'GH₵24.99',
              orders: 32,
            },
          ].map((product, i) => (
            <div
              key={i}
              className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-muted-foreground" />
                </div>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {product.orders} orders
                </span>
              </div>
              <h3 className="font-semibold text-foreground">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.vendor}</p>
              <p className="text-lg font-bold text-primary mt-2">
                {product.price}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
