import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Prescription } from '../models/prescription.model';

@Injectable({ providedIn: 'root' })
export class PrescriptionService {
  private apiUrl = `${environment.apiUrl}/Prescriptions`;

  constructor(private http: HttpClient) {}

  upload(file: File): Observable<{ message: string; prescriptionId: number }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ message: string; prescriptionId: number }>(`${this.apiUrl}/upload`, formData);
  }

  getMyPrescriptions(): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(`${this.apiUrl}/my`);
  }

  getPendingPrescriptions(): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(`${this.apiUrl}/pending`);
  }

  approvePrescription(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/approve`, { id });
  }
}