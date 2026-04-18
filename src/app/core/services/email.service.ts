import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class EmailService {
  private apiUrl = `${environment.apiUrl}/Email`;

  constructor(private http: HttpClient) {}

  sendContactForm(data: { name: string; email: string; message: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/send`, data);
  }

  resendOrderConfirmation(orderId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/resend-confirmation`, { orderId });
  }
}
