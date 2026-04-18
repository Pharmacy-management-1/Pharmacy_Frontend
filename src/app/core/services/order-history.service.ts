import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment.prod';

export interface OrderHistoryItem {
  id: number;
  orderNumber: string;
  orderDate: Date;
  totalAmount: number;
  status: string;
  prescriptionRequired: boolean;
  prescriptionStatus?: string;
  items: OrderItem[];
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderDetail extends OrderHistoryItem {
  shippingAddress: string;
  paymentMethod: string;
  prescriptionUrl?: string;
  loyaltyPointsEarned: number;
  estimatedDeliveryDate: Date;
  trackingInfo?: TrackingInfo;
}

export interface TrackingInfo {
  status: string;
  location: string;
  timestamp: Date;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getUserOrders(): Observable<OrderHistoryItem[]> {
    return this.http.get<OrderHistoryItem[]>(`${this.apiUrl}/history`);
  }

  getOrderDetails(orderId: number): Observable<OrderDetail> {
    return this.http.get<OrderDetail>(`${this.apiUrl}/${orderId}`);
  }

  cancelOrder(orderId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${orderId}/cancel`, {});
  }

  trackOrder(orderId: number): Observable<TrackingInfo> {
    return this.http.get<TrackingInfo>(`${this.apiUrl}/${orderId}/track`);
  }

  reorder(orderId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${orderId}/reorder`, {});
  }
}