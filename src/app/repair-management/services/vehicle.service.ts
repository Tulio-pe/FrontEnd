import { Injectable } from "@angular/core"
import { BehaviorSubject,  Observable } from "rxjs"
import { tap, catchError } from "rxjs/operators"
import  { HttpClient } from "@angular/common/http"
import  { Vehicle, CreateVehicleRequest } from "../models"
import { environment } from "../../../environment/environment"

@Injectable({
  providedIn: "root",
})
export class VehicleService {
  private apiUrl = environment.apiUrl
  private vehiclesSubject = new BehaviorSubject<Vehicle[]>([])
  public vehicles$ = this.vehiclesSubject.asObservable()

  constructor(private http: HttpClient) {
    this.loadVehicles()
  }

  /**
   * Loads all vehicles from backend.
   */
  private loadVehicles(): void {
    this.http.get<Vehicle[]>(`${this.apiUrl}${environment.endpoints.cars}`).subscribe({
      next: (vehicles) => this.vehiclesSubject.next(vehicles),
      error: (error) => {
        console.error("Error loading vehicles:", error)
        this.vehiclesSubject.next([])
      },
    })
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.vehicles$
  }

  /**
   * Gets vehicle by plate using your backend endpoint.
   */
  getVehicleByPlate(plate: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}${environment.endpoints.cars}/${plate}`).pipe(
      catchError((error) => {
        console.error("Error fetching vehicle by plate:", error)
        throw error
      }),
    )
  }

  createVehicle(request: CreateVehicleRequest): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.apiUrl}${environment.endpoints.cars}`, request).pipe(
      tap((newVehicle) => {
        // Actualizar el BehaviorSubject
        const currentVehicles = this.vehiclesSubject.value
        this.vehiclesSubject.next([...currentVehicles, newVehicle])
      }),
      catchError((error) => {
        console.error("Error creating vehicle:", error)
        throw error
      }),
    )
  }

  updateVehicleRepairStatus(vehicleId: string, isInRepair: boolean): Observable<Vehicle> {
    return this.http
      .put<Vehicle>(`${this.apiUrl}${environment.endpoints.cars}/${vehicleId}/repair-status`, {
        isInRepair,
      })
      .pipe(
        tap((updatedVehicle) => {
          // Actualizar el BehaviorSubject
          const currentVehicles = this.vehiclesSubject.value
          const updatedVehicles = currentVehicles.map((vehicle) =>
            vehicle.id === vehicleId ? updatedVehicle : vehicle,
          )
          this.vehiclesSubject.next(updatedVehicles)
        }),
        catchError((error) => {
          console.error("Error updating vehicle repair status:", error)
          throw error
        }),
      )
  }

  /**
   * Updates vehicle information.
   */
  updateVehicle(vehicleId: string, vehicleData: Partial<Vehicle>): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.apiUrl}${environment.endpoints.cars}/${vehicleId}`, vehicleData).pipe(
      tap((updatedVehicle) => {
        const currentVehicles = this.vehiclesSubject.value
        const updatedVehicles = currentVehicles.map((vehicle) => (vehicle.id === vehicleId ? updatedVehicle : vehicle))
        this.vehiclesSubject.next(updatedVehicles)
      }),
      catchError((error) => {
        console.error("Error updating vehicle:", error)
        throw error
      }),
    )
  }

  /**
   * Deletes a vehicle.
   */
  deleteVehicle(vehicleId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${environment.endpoints.cars}/${vehicleId}`).pipe(
      tap(() => {
        const currentVehicles = this.vehiclesSubject.value
        const filteredVehicles = currentVehicles.filter((vehicle) => vehicle.id !== vehicleId)
        this.vehiclesSubject.next(filteredVehicles)
      }),
      catchError((error) => {
        console.error("Error deleting vehicle:", error)
        throw error
      }),
    )
  }
}
