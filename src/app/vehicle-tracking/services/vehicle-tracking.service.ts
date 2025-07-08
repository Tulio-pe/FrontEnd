import { Injectable } from "@angular/core"
import {  Observable, of } from "rxjs"
import { catchError } from "rxjs/operators"
import  { HttpClient } from "@angular/common/http"
import  { VehicleTracking, TrackingCodeRequest } from "../models"
import { environment } from "../../../environment/environment"

/**
 * Service for vehicle tracking operations.
 * Now connected to real backend API.
 */
@Injectable({
  providedIn: "root",
})
export class VehicleTrackingService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  /**
   * Retrieves vehicle tracking information by code from backend.
   */
  getVehicleTracking(code: string): Observable<VehicleTracking> {
    return this.http.get<VehicleTracking>(`${this.apiUrl}/tracking/code/${code}`).pipe(
      catchError((error) => {
        console.error("Error fetching vehicle tracking:", error)
        throw new Error("Código de seguimiento no encontrado")
      }),
    )
  }

  /**
   * Gets vehicle by plate (using your cars endpoint).
   */
  getVehicleByPlate(plate: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${environment.endpoints.cars}/${plate}`).pipe(
      catchError((error) => {
        console.error("Error fetching vehicle by plate:", error)
        throw error
      }),
    )
  }

  /**
   * Validates if a tracking code exists.
   */
  validateTrackingCode(request: TrackingCodeRequest): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/tracking/validate`, request).pipe(
      catchError((error) => {
        console.error("Error validating tracking code:", error)
        return of(false)
      }),
    )
  }

  /**
   * Creates a new tracking entry (if needed for your workflow).
   */
  createTracking(trackingData: Partial<VehicleTracking>): Observable<VehicleTracking> {
    return this.http.post<VehicleTracking>(`${this.apiUrl}/tracking`, trackingData).pipe(
      catchError((error) => {
        console.error("Error creating tracking:", error)
        throw error
      }),
    )
  }

  /**
   * Updates tracking status (for workshop use).
   */
  updateTrackingStatus(trackingId: string, statusUpdate: any): Observable<VehicleTracking> {
    return this.http.put<VehicleTracking>(`${this.apiUrl}/tracking/${trackingId}/status`, statusUpdate).pipe(
      catchError((error) => {
        console.error("Error updating tracking status:", error)
        throw error
      }),
    )
  }
}
