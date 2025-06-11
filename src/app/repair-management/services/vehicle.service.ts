import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Vehicle } from '../models/vehicle.entity';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private baseUrl = 'http://localhost:3000/vehicles';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getAll(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.baseUrl, this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  create(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.baseUrl, vehicle, this.httpOptions).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Server error:', error);
    return throwError(() => new Error('Error doing operation with vehicles.'));
  }

  getByLicensePlate(plate: string): Observable<Vehicle[]> {
    const url = `${this.baseUrl}?license_plate=${encodeURIComponent(plate)}`;
    return this.http.get<Vehicle[]>(url);
  }
}
