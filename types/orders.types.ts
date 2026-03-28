export interface Order {
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
