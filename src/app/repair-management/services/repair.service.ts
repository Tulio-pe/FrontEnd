import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable, of } from "rxjs"
import { delay, map } from "rxjs/operators"
import type { Repair, CreateRepairRequest, RepairStatus } from "../models"

/**
 * Service for managing repair operations and status tracking.
 */
@Injectable({
  providedIn: "root",
})
export class RepairService {
  private repairsSubject = new BehaviorSubject<Repair[]>([
    {
      id: "1",
      plateNumber: "ABC-123",
      vehicleInfo: {
        brand: "Toyota",
        model: "Corolla",
        year: 2020,
        color: "Blanco",
      },
      services: [
        {
          id: "1",
          name: "Cambio aceite",
          description: "Cambio completo de aceite y filtro",
          estimatedTime: "30 min",
          price: 80,
          status: "pending",
        },
        {
          id: "2",
          name: "Transmisión",
          description: "Revisión de transmisión",
          estimatedTime: "2 horas",
          price: 200,
          status: "pending",
        },
        {
          id: "3",
          name: "Refrigeración",
          description: "Mantenimiento del sistema de refrigeración",
          estimatedTime: "1 hora",
          price: 150,
          status: "pending",
        },
      ],
      status: "por-revisar",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
    },
  ])

  public repairs$ = this.repairsSubject.asObservable()

  getRepairs(): Observable<Repair[]> {
    return this.repairs$
  }

  getRepairsByStatus(status: RepairStatus): Observable<Repair[]> {
    return this.repairs$.pipe(map((repairs) => repairs.filter((repair) => repair.status === status)))
  }

  /**
   * Creates a new repair order.
   */
  createRepair(request: CreateRepairRequest): Observable<Repair> {
    const newRepair: Repair = {
      id: Date.now().toString(),
      plateNumber: request.plateNumber,
      vehicleInfo: request.vehicleInfo,
      services: request.services.map((serviceName, index) => ({
        id: (index + 1).toString(),
        name: serviceName,
        description: `Servicio de ${serviceName}`,
        estimatedTime: "1 hora",
        price: 100,
        status: "pending" as const,
      })),
      status: "por-revisar",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const currentRepairs = this.repairsSubject.value
    this.repairsSubject.next([...currentRepairs, newRepair])

    return of(newRepair).pipe(delay(500))
  }

  /**
   * Updates repair status to next stage.
   */
  updateRepairStatus(repairId: string, status: RepairStatus): Observable<Repair> {
    const currentRepairs = this.repairsSubject.value
    const updatedRepairs = currentRepairs.map((repair) =>
      repair.id === repairId ? { ...repair, status, updatedAt: new Date().toISOString() } : repair,
    )

    this.repairsSubject.next(updatedRepairs)

    const updatedRepair = updatedRepairs.find((r) => r.id === repairId)!
    return of(updatedRepair).pipe(delay(300))
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
