import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface SeasonalOffer {
  id: number;
  title: string;
  description: string;
  discountPercentage: number;
  code: string;
  validFrom: Date;
  validTo: Date;
  applicableOn: 'all' | 'category' | 'specific';
  categoryId?: number;
  productIds?: number[];
  minOrderAmount?: number;
  maxDiscount?: number;
  imageUrl: string;
  isActive: boolean;
  termsAndConditions?: string[];
}

export interface OfferValidationResult {
  isValid: boolean;
  discountAmount: number;
  finalAmount: number;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = `${environment.apiUrl}/offers`;

  constructor(private http: HttpClient) {}

  getActiveOffers(): Observable<SeasonalOffer[]> {
    return this.http.get<SeasonalOffer[]>(`${this.apiUrl}/active`);
  }

  getOfferByCode(code: string): Observable<SeasonalOffer> {
    return this.http.get<SeasonalOffer>(`${this.apiUrl}/code/${code}`);
  }

  validateOffer(code: string, cartTotal: number, items?: any[]): Observable<OfferValidationResult> {
    return this.http.post<OfferValidationResult>(`${this.apiUrl}/validate`, { code, cartTotal, items });
  }

  getSeasonalOffers(): Observable<SeasonalOffer[]> {
    return this.http.get<SeasonalOffer[]>(`${this.apiUrl}/seasonal`);
  }

  getOfferOfTheDay(): Observable<SeasonalOffer> {
    return this.http.get<SeasonalOffer>(`${this.apiUrl}/offer-of-day`);
  }

  applyOfferToCart(offerCode: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/apply`, { code: offerCode });
  }
}