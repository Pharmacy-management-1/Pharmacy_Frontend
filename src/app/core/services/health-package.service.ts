import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface HealthPackage {
  id: number;
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
  discountPercentage: number;
  duration: string;
  products: PackageProduct[];
  savings: number;
  imageUrl: string;
  isActive: boolean;
  features: string[];
}

export interface PackageProduct {
  productId: number;
  productName: string;
  quantity: number;
  regularPrice: number;
}

export interface SubscriptionRequest {
  packageId: number;
  deliveryInterval: 'weekly' | 'biweekly' | 'monthly';
  startDate: Date;
  addressId: number;
  quantity?: number;
}

export interface UserSubscription {
  id: number;
  packageId: number;
  packageName: string;
  deliveryInterval: string;
  nextDeliveryDate: Date;
  status: 'active' | 'paused' | 'cancelled';
  startDate: Date;
  totalDeliveries: number;
  completedDeliveries: number;
}

@Injectable({
  providedIn: 'root'
})
export class HealthPackageService {
  private apiUrl = `${environment.apiUrl}/health-packages`;

  constructor(private http: HttpClient) {}

  getAllPackages(): Observable<HealthPackage[]> {
    return this.http.get<HealthPackage[]>(this.apiUrl);
  }

  getPackageById(id: number): Observable<HealthPackage> {
    return this.http.get<HealthPackage>(`${this.apiUrl}/${id}`);
  }

  subscribeToPackage(subscription: SubscriptionRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/subscribe`, subscription);
  }

  getUserSubscriptions(): Observable<UserSubscription[]> {
    return this.http.get<UserSubscription[]>(`${this.apiUrl}/my-subscriptions`);
  }

  cancelSubscription(subscriptionId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/subscriptions/${subscriptionId}/cancel`, {});
  }

  pauseSubscription(subscriptionId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/subscriptions/${subscriptionId}/pause`, {});
  }

  resumeSubscription(subscriptionId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/subscriptions/${subscriptionId}/resume`, {});
  }

  updateDeliveryInterval(subscriptionId: number, interval: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/subscriptions/${subscriptionId}/interval`, { interval });
  }
}