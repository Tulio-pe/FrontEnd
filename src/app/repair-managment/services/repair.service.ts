import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { RepairOrder, StatusType } from '../models/repairorder.entity';

@Injectable({
  providedIn: 'root'
})
export class RepairService {
  private baseUrl = 'http://localhost:3000/repairs';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error(`Server error ${error.status}:`, error.error);
    }
    return throwError(() => new Error('Communication error with server. Please try again later.'));
  }

  // Obtener todas las órdenes de reparación
  getAll(): Observable<RepairOrder[]> {
    return this.http.get<RepairOrder[]>(this.baseUrl, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Crear una nueva orden de reparación
  create(order: RepairOrder): Observable<RepairOrder> {
    return this.http.post<RepairOrder>(this.baseUrl, order, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Actualizar una orden (usando PUT completo)
  update(order: RepairOrder): Observable<RepairOrder> {
    const url = `${this.baseUrl}/${order.id}`;
    return this.http.put<RepairOrder>(url, order, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Filtrar órdenes por estado (status)
  filterByStatus(status: StatusType): Observable<RepairOrder[]> {
    const url = `${this.baseUrl}?status=${encodeURIComponent(status)}`;
    return this.http.get<RepairOrder[]>(url, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Eliminar una orden por ID
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
