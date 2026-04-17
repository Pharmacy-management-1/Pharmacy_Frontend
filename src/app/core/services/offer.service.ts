import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Offer } from '../models/offer.model';

export interface SeasonalOffer extends Offer {
  code: string;
  isActive: boolean;
}

@Injectable({ providedIn: 'root' })
export class OfferService {
  private apiUrl = `${environment.apiUrl}/Offers`;

  constructor(private http: HttpClient) {}

  getActiveOffers(): Observable<SeasonalOffer[]> {
    return this.http.get<SeasonalOffer[]>(`${this.apiUrl}/active`);
  }

  getAll(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.apiUrl);
  }

  applyOfferToCart(code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/apply`, { code });
  }
}
