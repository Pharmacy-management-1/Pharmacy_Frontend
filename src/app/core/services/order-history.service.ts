import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order, OrderItem } from '../models/order.model';

export interface OrderHistoryItem {
  id: number;
  orderNumber: string;
  orderDate: string;
  totalAmount: number;
  status: string;
  itemCount: number;
  items: OrderItem[];
}

export interface OrderDetail extends Order {
  shippingAddress: string;
  paymentMethod: string;
  items: OrderItem[];
}

@Injectable({ providedIn: 'root' })
export class OrderHistoryService {
  private apiUrl = `${environment.apiUrl}/OrderHistory`;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<OrderHistoryItem[]> {
    return this.http.get<OrderHistoryItem[]>(this.apiUrl);
  }

  getUserOrders(): Observable<OrderHistoryItem[]> {
    return this.getOrders();
  }

  getOrderDetails(orderId: number): Observable<OrderDetail> {
    return this.http.get<OrderDetail>(`${this.apiUrl}/${orderId}`);
  }

  cancelOrder(orderId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${orderId}/cancel`, {});
  }
}
