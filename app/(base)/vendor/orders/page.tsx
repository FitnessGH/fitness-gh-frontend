'use client';

import { useAuth } from '@/components/auth-context';
import MarketplaceAPI, { type Order as ApiOrder, OrderStatus } from '@/lib/api/marketplace';
import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { Calendar, Loader2, MapPin, Package, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  items: number;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  orderDate: string;
  dueDate: string;
  destination: string;
  orderItems?: Array<{
    productName: string;
    quantity: number;
    price: number;
  }>;
}

// Transform API order to frontend format
function transformOrder(apiOrder: ApiOrder): Order {
  const customerName = apiOrder.customer
    ? `${apiOrder.customer.firstName || ''} ${apiOrder.customer.lastName || ''}`.trim() || apiOrder.customer.username
    : 'Unknown Customer';

  const shippingAddress = apiOrder.shippingAddress as any;
  const destination = shippingAddress
    ? `${shippingAddress.street || ''}, ${shippingAddress.city || ''}, ${shippingAddress.region || ''}`.trim()
    : 'Address not provided';

  // Map backend status to frontend status
  const statusMap: Record<OrderStatus, 'Pending' | 'Processing' | 'Shipped' | 'Delivered'> = {
    PENDING: 'Pending',
    PROCESSING: 'Processing',
    SHIPPED: 'Shipped',
    DELIVERED: 'Delivered',
    CANCELLED: 'Pending', // Fallback
    REFUNDED: 'Pending', // Fallback
  };

  const orderDate = apiOrder.createdAt
    ? new Date(apiOrder.createdAt).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];

  // Calculate due date (7 days from order date)
  const dueDate = new Date(apiOrder.createdAt);
  dueDate.setDate(dueDate.getDate() + 7);
  const dueDateStr = dueDate.toISOString().split('T')[0];

  return {
    id: apiOrder.id,
    orderNumber: apiOrder.orderNumber,
    customer: customerName,
    items: apiOrder.items.length,
    total: apiOrder.total,
    status: statusMap[apiOrder.status],
    orderDate,
    dueDate: dueDateStr,
    destination,
    orderItems: apiOrder.items.map((item) => ({
      productName: item.product.name,
      quantity: item.quantity,
      price: item.price,
    })),
  };
}

export default function VendorOrdersPage() {
  const { isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<
    'All' | 'Pending' | 'Processing' | 'Shipped' | 'Delivered'
  >('All');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      if (authLoading) {
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const apiOrders = await MarketplaceAPI.getVendorOrders();
        const transformedOrders = apiOrders.map(transformOrder);
        setOrders(transformedOrders);
      } catch (err: any) {
        console.error('Failed to fetch orders:', err);
        setError(err.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [authLoading]);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'All' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    try {
      // Map frontend status to backend status
      const statusMap: Record<'Pending' | 'Processing' | 'Shipped' | 'Delivered', OrderStatus> = {
        Pending: 'PENDING',
        Processing: 'PROCESSING',
        Shipped: 'SHIPPED',
        Delivered: 'DELIVERED',
      };

      await MarketplaceAPI.updateOrderStatus(orderId, statusMap[newStatus]);
      
      // Refresh orders
      const apiOrders = await MarketplaceAPI.getVendorOrders();
      const transformedOrders = apiOrders.map(transformOrder);
      setOrders(transformedOrders);
    } catch (err: any) {
      console.error('Failed to update order status:', err);
      alert(err.message || 'Failed to update order status');
    }
  };

  const statusColors: Record<Order['status'], string> = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Processing: 'bg-blue-100 text-blue-700',
    Shipped: 'bg-purple-100 text-purple-700',
    Delivered: 'bg-green-100 text-green-700',
  };

  if (authLoading || loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">
            {authLoading ? 'Loading...' : 'Loading orders...'}
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
      <div>
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground">Track and manage your orders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: 'Pending',
            value: orders.filter((o) => o.status === 'Pending').length,
            color: 'bg-yellow-100',
          },
          {
            label: 'Processing',
            value: orders.filter((o) => o.status === 'Processing').length,
            color: 'bg-blue-100',
          },
          {
            label: 'Shipped',
            value: orders.filter((o) => o.status === 'Shipped').length,
            color: 'bg-purple-100',
          },
          {
            label: 'Delivered',
            value: orders.filter((o) => o.status === 'Delivered').length,
            color: 'bg-green-100',
          },
        ].map((stat, i) => (
          <Card
            key={i}
            className={`p-4 border-0 ${stat.color}`}
          >
            <p className="text-sm font-medium text-foreground">{stat.label}</p>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </Card>
        ))}
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
                placeholder="Search by customer or order number..."
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
                setFilterStatus(
                  e.target.value as
                    | 'All'
                    | 'Pending'
                    | 'Processing'
                    | 'Shipped'
                    | 'Delivered',
                )
              }
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {filteredOrders.map((order) => (
          <Card
            key={order.id}
            className="border-border/50 overflow-hidden"
          >
            <button
              onClick={() =>
                setExpandedOrder(expandedOrder === order.id ? null : order.id)
              }
              className="w-full text-left p-4 hover:bg-muted/30 transition-colors"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <div>
                  <p className="font-semibold text-foreground">
                    {order.orderNumber}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.customer}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Items</p>
                  <p className="font-semibold text-foreground">{order.items}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="font-semibold text-primary">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Due</p>
                  <p className="text-sm text-foreground">{order.dueDate}</p>
                </div>
                <div className="flex justify-between items-center">
                  <Badge className={statusColors[order.status]}>
                    {order.status}
                  </Badge>
                </div>
              </div>
            </button>

            {expandedOrder === order.id && (
              <div className="border-t border-border bg-muted/20 p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Order Items
                      </p>
                      <div className="space-y-1">
                        {order.orderItems?.map((item, idx) => (
                          <p key={idx} className="text-sm text-foreground">
                            {item.productName} × {item.quantity} - GH₵{item.price.toFixed(2)}
                          </p>
                        )) || (
                          <p className="font-semibold text-foreground">
                            {order.items} products
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Order Date
                      </p>
                      <p className="font-semibold text-foreground">
                        {order.orderDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Destination
                      </p>
                      <p className="font-semibold text-foreground">
                        {order.destination}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex gap-2">
                  {['Pending', 'Processing', 'Shipped', 'Delivered'].map(
                    (status) => (
                      <Button
                        key={status}
                        size="sm"
                        variant={
                          order.status === status ? 'default' : 'outline'
                        }
                        className={
                          order.status === status
                            ? 'bg-primary hover:bg-primary/90'
                            : 'bg-transparent'
                        }
                        onClick={() =>
                          handleStatusChange(
                            order.id,
                            status as Order['status'],
                          )
                        }
                      >
                        {status}
                      </Button>
                    ),
                  )}
                </div>
              </div>
            )}
          </Card>
        ))}
        {filteredOrders.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">
              {orders.length === 0
                ? 'No orders found.'
                : 'No orders match your search criteria.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
