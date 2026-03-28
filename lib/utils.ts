import { OrderStatus, type Order as ApiOrder } from '@/lib/api/marketplace';
import type { Order } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const transformOrder = (apiOrder: ApiOrder): Order => {
  const customerName = apiOrder.customer
    ? `${apiOrder.customer.firstName || ''} ${apiOrder.customer.lastName || ''}`.trim() ||
      apiOrder.customer.username
    : 'Unknown Customer';

  const shippingAddress = apiOrder.shippingAddress as any;
  const destination = shippingAddress
    ? `${shippingAddress.street || ''}, ${shippingAddress.city || ''}, ${shippingAddress.region || ''}`.trim()
    : 'Address not provided';

  const statusMap: Record<
    OrderStatus,
    'Pending' | 'Processing' | 'Shipped' | 'Delivered'
  > = {
    PENDING: 'Pending',
    PROCESSING: 'Processing',
    SHIPPED: 'Shipped',
    DELIVERED: 'Delivered',
    CANCELLED: 'Pending',
    REFUNDED: 'Pending',
  };

  const orderDate = apiOrder.createdAt
    ? new Date(apiOrder.createdAt).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];

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
};
