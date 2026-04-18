import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product, InventoryStatus } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = `${environment.apiUrl}/Products`;

  constructor(private http: HttpClient) {}

  getProducts(params?: any): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, { params });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getLowStock(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/inventory/low-stock`);
  }

  getInventory(productId: number): Observable<InventoryStatus> {
    return this.http.get<InventoryStatus>(`${this.apiUrl}/${productId}/inventory`);
  }

  reserveStock(productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${productId}/inventory/reserve`, { quantity });
  }

  releaseStock(productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${productId}/inventory/release`, { quantity });
  }
}
