import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface FrequentItem {
  productId: number;
  productName: string;
  timesOrdered: number;
  lastOrdered: Date;
  price: number;
  imageUrl: string;
}

export interface ReorderRequest {
  orderId: number;
  items?: { productId: number; quantity: number }[];
}

@Injectable({
  providedIn: 'root'
})
export class QuickReorderService {
  private apiUrl = `${environment.apiUrl}/quick-reorder`;

  constructor(private http: HttpClient) {}

  getReorderableOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reorderable`);
  }

  getFrequentItems(limit: number = 10): Observable<FrequentItem[]> {
    return this.http.get<FrequentItem[]>(`${this.apiUrl}/frequent-items?limit=${limit}`);
  }

  quickReorder(orderId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reorder`, { orderId });
  }

  quickReorderCustom(request: ReorderRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/reorder-custom`, request);
  }

  getReorderRecommendations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recommendations`);
  }
}