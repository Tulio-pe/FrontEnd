import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, switchMap, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { RepairOrder, StatusType } from '../models/repairorder.entity';

@Injectable({
  providedIn: 'root'
})
export class RepairService {
  /** Base URL for the repairs API endpoint */
  private baseUrl = 'http://localhost:3000/repairs';
  /** HTTP options with JSON content type headers */
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  /**
   * Handles HTTP errors for all requests in this service.
   * Logs the error to the console and returns a user-friendly message.
   * @param error The HTTP error response object
   * @returns Observable that errors with a friendly message
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('Client error:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      console.error(`Server error ${error.status}:`, error.error);
    }
    return throwError(() => new Error('Communication error with the server, please try again later.'));
  }

  /**
   * Retrieves an array of RepairOrders filtered by vehicle license plate.
   * @param plate The license plate to filter by
   * @returns Observable array of matching RepairOrder objects
   */
  getByPlate(plate: string): Observable<RepairOrder[]> {
    const url = `${this.baseUrl}?plate=${encodeURIComponent(plate)}`;
    return this.http.get<RepairOrder[]>(url, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Updates the status of a RepairOrder by its unique ID.
   * @param id The unique ID of the repair order
   * @param newStatus The new status to set
   * @returns Observable of the updated RepairOrder
   */
  updateStatusById(id: string, newStatus: StatusType): Observable<RepairOrder> {
    const url = `${this.baseUrl}/${id}`;
    const body = { status: newStatus };
    return this.http.patch<RepairOrder>(url, body, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Combined method that searches for RepairOrders by vehicle license plate,
   * and if found, updates the status of the first matching RepairOrder.
   * @param plate The vehicle license plate to search by
   * @param newStatus The new status to set
   * @returns Observable of the updated RepairOrder or null if none found
   */
  updateStatusByPlate(plate: string, newStatus: StatusType): Observable<RepairOrder | null> {
    return this.getByPlate(plate).pipe(
      switchMap(orders => {
        if (orders.length === 0) {
          console.warn(`No repair orders found with plate ${plate}`);
          return of(null);
        }
        const orderToUpdate = orders[0]; // Update the first matching order
        return this.updateStatusById(orderToUpdate.id, newStatus);
      }),
      catchError(err => {
        console.error('Error updating status by plate:', err);
        return of(null);
      })
    );
  }

  /**
   * Creates a new RepairOrder.
   * @param order The RepairOrder object to create
   * @returns Observable of the created RepairOrder
   */
  create(order: RepairOrder): Observable<RepairOrder> {
    return this.http.post<RepairOrder>(this.baseUrl, order, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Retrieves RepairOrders filtered by their status.
   * @param status The status to filter by
   * @returns Observable array of matching RepairOrders
   */
  filterByStatus(status: StatusType): Observable<RepairOrder[]> {
    const url = `${this.baseUrl}?status=${encodeURIComponent(status)}`;
    return this.http.get<RepairOrder[]>(url, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Retrieves all RepairOrders.
   * @returns Observable array of all RepairOrders
   */
  getAll(): Observable<RepairOrder[]> {
    return this.http.get<RepairOrder[]>(this.baseUrl, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Retrieves a RepairOrder by its unique ID.
   * @param id The unique ID of the repair order
   * @returns Observable of the RepairOrder
   */
  getById(id: string): Observable<RepairOrder> {
    return this.http.get<RepairOrder>(`${this.baseUrl}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Deletes a RepairOrder by its unique ID.
   * @param id The unique ID of the repair order to delete
   * @returns Observable<void> indicating completion
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
