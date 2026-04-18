export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  userId: number;
  orderDate: Date;
  totalAmount: number;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  prescriptionId?: number;
  paymentMethod: string;
  shippingAddress: string;
}

export interface CreateOrderRequest {
  items: { productId: number; quantity: number }[];
  prescriptionId?: number;
  paymentMethod: string;
  shippingAddress: string;
}