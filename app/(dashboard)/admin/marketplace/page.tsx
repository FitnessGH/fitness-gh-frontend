'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  AlertTriangle,
  DollarSign,
  ShoppingCart,
  TrendingUp,
} from 'lucide-react';

export default function AdminMarketplacePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Marketplace Oversight
        </h1>
        <p className="text-muted-foreground">
          Monitor marketplace activity and disputes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Vendors', value: '28', icon: ShoppingCart },
          { label: 'Total Transactions', value: '1,245', icon: TrendingUp },
          { label: 'Monthly Revenue', value: '$45,230', icon: DollarSign },
          { label: 'Open Disputes', value: '3', icon: AlertTriangle },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card
              key={i}
              className="p-4 border-border/50"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-2 text-foreground">
                    {stat.value}
                  </p>
                </div>
                <Icon className="w-5 h-5 text-primary" />
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-4 text-foreground">
          Recent Disputes
        </h2>
        <div className="space-y-3">
          {[
            {
              id: 'DSP-001',
              vendor: 'Elite Supplements',
              issue: 'Product quality complaint',
              status: 'Open',
            },
            {
              id: 'DSP-002',
              vendor: 'Fit Gear Co',
              issue: 'Shipping delay',
              status: 'In Review',
            },
            {
              id: 'DSP-003',
              vendor: 'ProFit Gear',
              issue: 'Wrong item shipped',
              status: 'Resolved',
            },
          ].map((dispute, i) => (
            <div
              key={i}
              className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-foreground">{dispute.id}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {dispute.vendor}
                  </p>
                  <p className="text-sm text-foreground mt-2">
                    {dispute.issue}
                  </p>
                </div>
                <Badge
                  className={
                    dispute.status === 'Open'
                      ? 'bg-red-100 text-red-700'
                      : dispute.status === 'In Review'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                  }
                >
                  {dispute.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 border-border/50">
        <h2 className="text-lg font-semibold mb-4 text-foreground">
          Top Vendors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Elite Supplements', sales: '$12,450', orders: 234 },
            { name: 'Fit Gear Co', sales: '$8,920', orders: 156 },
            { name: 'HydroMax', sales: '$7,340', orders: 128 },
          ].map((vendor, i) => (
            <div
              key={i}
              className="p-4 border border-border rounded-lg"
            >
              <p className="font-semibold text-foreground">{vendor.name}</p>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between">
                  <p className="text-xs text-muted-foreground">Sales</p>
                  <p className="text-sm font-semibold text-primary">
                    {vendor.sales}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-muted-foreground">Orders</p>
                  <p className="text-sm font-semibold text-foreground">
                    {vendor.orders}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
