import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface EmailRequest {
  to: string;
  subject: string;
  template: string;
  data: any;
}

export interface EmailPreferences {
  orderConfirmation: boolean;
  shippingUpdates: boolean;
  promotionalEmails: boolean;
  prescriptionReminders: boolean;
  newsletter: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = `${environment.apiUrl}/email`;

  constructor(private http: HttpClient) {}

  sendOrderConfirmation(orderId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/order-confirmation`, { orderId });
  }

  sendPrescriptionConfirmation(prescriptionId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/prescription-confirmation`, { prescriptionId });
  }

  sendOrderShippedNotification(orderId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/order-shipped`, { orderId });
  }

  sendSubscriptionReminder(subscriptionId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/subscription-reminder`, { subscriptionId });
  }

  updateEmailPreferences(preferences: EmailPreferences): Observable<any> {
    return this.http.put(`${this.apiUrl}/preferences`, preferences);
  }

  getUserEmailPreferences(): Observable<EmailPreferences> {
    return this.http.get<EmailPreferences>(`${this.apiUrl}/preferences`);
  }

  resendOrderConfirmation(orderId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/resend-order-confirmation`, { orderId });
  }
}