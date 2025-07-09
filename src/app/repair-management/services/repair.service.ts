import { Injectable } from "@angular/core"
import { BehaviorSubject,  Observable, of } from "rxjs"
import { tap, catchError } from "rxjs/operators"
import  { HttpClient } from "@angular/common/http"
import  { Repair, CreateRepairRequest, RepairStatus } from "../models"
import { environment } from "../../../environment/environment"


/**
 * Service for managing repair operations and status tracking.
 * Frontend only - no backend requests.
 */
@Injectable({
  providedIn: "root",
})
export class RepairService {
  private apiUrl = environment.apiUrl
  private repairsSubject = new BehaviorSubject<Repair[]>([])
  public repairs$ = this.repairsSubject.asObservable()

  constructor(private http: HttpClient) {
    // NO hacer requests al inicializar
  }

  /**
   * Loads all repairs from backend.
   */
  private loadRepairs(): void {
    // NO hacer requests - método deshabilitado
  }

  getRepairs(): Observable<Repair[]> {
    return this.repairs$
  }

  getRepairsByStatus(status: RepairStatus): Observable<Repair[]> {
    // Filtrar del array local en lugar de hacer request
    const currentRepairs = this.repairsSubject.value
    const filteredRepairs = currentRepairs.filter(repair => repair.status === status)
    return of(filteredRepairs)
  }

  /**
   * Creates a new repair order locally.
   */
  createRepair(request: CreateRepairRequest): Observable<Repair> {
    // Crear repair mock localmente
    const mockRepair: Repair = {
      id: Date.now().toString(),
      plateNumber: request.plateNumber,
      vehicleInfo: request.vehicleInfo,
      services: request.services.map((serviceName, index) => ({
        id: `service-${Date.now()}-${index}`,
        name: serviceName,
        description: `Servicio de ${serviceName}`,
        estimatedTime: "2-3 horas",
        price: Math.floor(Math.random() * 500) + 100, // Precio aleatorio entre 100-600
        status: "pending" as const
      })),
      status: 'por-revisar' as RepairStatus,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    }

    // Actualizar el BehaviorSubject
    const currentRepairs = this.repairsSubject.value
    this.repairsSubject.next([...currentRepairs, mockRepair])

    return of(mockRepair)
  }

  /**
   * Updates repair status locally.
   */
  updateRepairStatus(repairId: string, status: RepairStatus): Observable<Repair> {
    // Buscar y actualizar localmente
    const currentRepairs = this.repairsSubject.value
    const repairToUpdate = currentRepairs.find(repair => repair.id === repairId)

    if (repairToUpdate) {
      const updatedRepair = { ...repairToUpdate, status, updatedAt: new Date().toISOString() }
      const updatedRepairs = currentRepairs.map((repair) => (repair.id === repairId ? updatedRepair : repair))
      this.repairsSubject.next(updatedRepairs)
      return of(updatedRepair)
    }

    return of(repairToUpdate!)
  }

  /**
   * Gets repair by ID locally.
   */
  getRepairById(repairId: string): Observable<Repair> {
    // Buscar en el array local
    const currentRepairs = this.repairsSubject.value
    const repair = currentRepairs.find(r => r.id === repairId)

    if (repair) {
      return of(repair)
    }

    // Si no encuentra, crear uno mock para evitar errores
    const mockRepair: Repair = {
      id: repairId,
      plateNumber: 'ABC-123',
      vehicleInfo: {
        brand: 'Toyota',
        model: 'Corolla',
        year: 2023,
        color: 'Blanco'
      },
      services: [{
        id: 'service-1',
        name: 'Cambio aceite',
        description: 'Cambio de aceite motor',
        estimatedTime: '1-2 horas',
        price: 150,
        status: 'pending'
      }],
      status: 'por-revisar' as RepairStatus,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    }

    return of(mockRepair)
  }

  /**
   * Deletes a repair locally.
   */
  deleteRepair(repairId: string): Observable<void> {
    // Eliminar del array local
    const currentRepairs = this.repairsSubject.value
    const filteredRepairs = currentRepairs.filter((repair) => repair.id !== repairId)
    this.repairsSubject.next(filteredRepairs)

    return of(undefined)
  }

  getAvailableServices(): string[] {
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
