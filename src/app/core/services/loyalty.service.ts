import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoyaltyInfo } from '../models/loyalty.model';

@Injectable({ providedIn: 'root' })
export class LoyaltyService {
  private apiUrl = `${environment.apiUrl}/Loyalty`;

  constructor(private http: HttpClient) {}

  getPoints(): Observable<{ points: number }> {
    return this.http.get<{ points: number }>(`${this.apiUrl}/points`);
  }

  getInfo(): Observable<LoyaltyInfo> {
    return this.http.get<LoyaltyInfo>(`${this.apiUrl}/info`);
  }
}