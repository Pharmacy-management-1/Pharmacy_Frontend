import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface FrequentItem {
  productId: number;
  productName: string;
  quantity: number;
  lastOrdered: string;
}

export interface ReorderRecommendation {
  productId: number;
  productName: string;
  reason: string;
}

@Injectable({ providedIn: 'root' })
export class QuickReorderService {
  private apiUrl = `${environment.apiUrl}/QuickReorder`;

  constructor(private http: HttpClient) {}

  getFrequentItems(): Observable<FrequentItem[]> {
    return this.http.get<FrequentItem[]>(`${this.apiUrl}/frequent-items`);
  }

  getReorderRecommendations(): Observable<ReorderRecommendation[]> {
    return this.http.get<ReorderRecommendation[]>(`${this.apiUrl}/recommendations`);
  }

  quickReorder(orderId: number): Observable<{ orderId: number }> {
    return this.http.post<{ orderId: number }>(`${this.apiUrl}/reorder`, { orderId });
  }

  reorder(orderId: number): Observable<{ orderId: number }> {
    return this.quickReorder(orderId);
  }
}
