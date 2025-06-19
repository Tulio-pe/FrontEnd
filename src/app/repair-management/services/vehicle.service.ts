import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable, of } from "rxjs"
import { delay } from "rxjs/operators"
import type { Vehicle, CreateVehicleRequest } from "../models"

@Injectable({
  providedIn: "root",
})
export class VehicleService {
  private vehiclesSubject = new BehaviorSubject<Vehicle[]>([
    {
      id: "1",
      plateNumber: "XYZ-789",
      brand: "Honda",
      model: "Civic",
      year: 2019,
      color: "Azul",
      createdAt: "2024-01-14T15:30:00Z",
      isInRepair: false,
    },
  ])

  public vehicles$ = this.vehiclesSubject.asObservable()

  getVehicles(): Observable<Vehicle[]> {
    return this.vehicles$
  }

  createVehicle(request: CreateVehicleRequest): Observable<Vehicle> {
    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      ...request,
      createdAt: new Date().toISOString(),
      isInRepair: false,
    }

    const currentVehicles = this.vehiclesSubject.value
    this.vehiclesSubject.next([...currentVehicles, newVehicle])

    return of(newVehicle).pipe(delay(500))
  }

  updateVehicleRepairStatus(vehicleId: string, isInRepair: boolean): Observable<Vehicle> {
    const currentVehicles = this.vehiclesSubject.value
    const updatedVehicles = currentVehicles.map((vehicle) =>
      vehicle.id === vehicleId ? { ...vehicle, isInRepair } : vehicle,
    )

    this.vehiclesSubject.next(updatedVehicles)

    const updatedVehicle = updatedVehicles.find((v) => v.id === vehicleId)!
    return of(updatedVehicle).pipe(delay(300))
  }
}
