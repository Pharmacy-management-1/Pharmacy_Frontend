import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HealthPackage } from '../models/health-package.model';

@Injectable({ providedIn: 'root' })
export class HealthPackageService {
  private apiUrl = `${environment.apiUrl}/HealthPackages`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<HealthPackage[]> {
    return this.http.get<HealthPackage[]>(this.apiUrl);
  }

  getById(id: number): Observable<HealthPackage> {
    return this.http.get<HealthPackage>(`${this.apiUrl}/${id}`);
  }
}