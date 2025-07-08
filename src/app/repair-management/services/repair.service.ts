import { Injectable } from "@angular/core"
import { BehaviorSubject,  Observable } from "rxjs"
import { tap, catchError } from "rxjs/operators"
import  { HttpClient } from "@angular/common/http"
import  { Repair, CreateRepairRequest, RepairStatus } from "../models"
import { environment } from "../../../environment/environment"

/**
 * Service for managing repair operations and status tracking.
 * Now connected to real backend API.
 */
@Injectable({
  providedIn: "root",
})
export class RepairService {
  private apiUrl = environment.apiUrl
  private repairsSubject = new BehaviorSubject<Repair[]>([])
  public repairs$ = this.repairsSubject.asObservable()

  constructor(private http: HttpClient) {
    this.loadRepairs()
  }

  /**
   * Loads all repairs from backend.
   */
  private loadRepairs(): void {
    this.http.get<Repair[]>(`${this.apiUrl}/repairs`).subscribe({
      next: (repairs) => this.repairsSubject.next(repairs),
      error: (error) => {
        console.error("Error loading repairs:", error)
        // Mantener array vacío en caso de error
        this.repairsSubject.next([])
      },
    })
  }

  getRepairs(): Observable<Repair[]> {
    return this.repairs$
  }

  getRepairsByStatus(status: RepairStatus): Observable<Repair[]> {
    return this.http.get<Repair[]>(`${this.apiUrl}/repairs?status=${status}`).pipe(
      catchError((error) => {
        console.error("Error fetching repairs by status:", error)
        throw error
      }),
    )
  }

  /**
   * Creates a new repair order in backend.
   */
  createRepair(request: CreateRepairRequest): Observable<Repair> {
    return this.http.post<Repair>(`${this.apiUrl}/repairs`, request).pipe(
      tap((newRepair) => {
        // Actualizar el BehaviorSubject con la nueva reparación
        const currentRepairs = this.repairsSubject.value
        this.repairsSubject.next([...currentRepairs, newRepair])
      }),
      catchError((error) => {
        console.error("Error creating repair:", error)
        throw error
      }),
    )
  }

  /**
   * Updates repair status in backend.
   */
  updateRepairStatus(repairId: string, status: RepairStatus): Observable<Repair> {
    return this.http.put<Repair>(`${this.apiUrl}/repairs/${repairId}/status`, { status }).pipe(
      tap((updatedRepair) => {
        // Actualizar el BehaviorSubject
        const currentRepairs = this.repairsSubject.value
        const updatedRepairs = currentRepairs.map((repair) => (repair.id === repairId ? updatedRepair : repair))
        this.repairsSubject.next(updatedRepairs)
      }),
      catchError((error) => {
        console.error("Error updating repair status:", error)
        throw error
      }),
    )
  }

  /**
   * Gets repair by ID from backend.
   */
  getRepairById(repairId: string): Observable<Repair> {
    return this.http.get<Repair>(`${this.apiUrl}/repairs/${repairId}`).pipe(
      catchError((error) => {
        console.error("Error fetching repair by ID:", error)
        throw error
      }),
    )
  }

  /**
   * Deletes a repair from backend.
   */
  deleteRepair(repairId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/repairs/${repairId}`).pipe(
      tap(() => {
        // Remover del BehaviorSubject
        const currentRepairs = this.repairsSubject.value
        const filteredRepairs = currentRepairs.filter((repair) => repair.id !== repairId)
        this.repairsSubject.next(filteredRepairs)
      }),
      catchError((error) => {
        console.error("Error deleting repair:", error)
        throw error
      }),
    )
  }

  getAvailableServices(): string[] {
    // Esto puede seguir siendo local o también venir del backend
    return [
      "Cambio aceite",
      "Transmisión",
      "Refrigeración",
      "Frenos",
      "Suspensión",
      "Electricidad",
      "Pintura",
      "Planchado",
      "Llantas nuevas",
      "Llantas usadas",
    ]
  }
}
