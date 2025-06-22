import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs"
import { delay } from "rxjs/operators"
import  { VehicleTracking, TrackingCodeRequest } from "../models"

@Injectable({
  providedIn: "root",
})
export class VehicleTrackingService {
  private mockTrackingData: { [key: string]: VehicleTracking } = {
    TRK001234: {
      id: "1",
      trackingCode: "TRK001234",
      vehicleInfo: {
        licensePlate: "ABC-123",
        brand: "Toyota",
        model: "Corolla",
        year: 2020,
        color: "Blanco",
        vin: "1HGBH41JXMN109186",
      },
      currentStatus: {
        currentStage: "Diagnóstico",
        progress: 60,
        description: "Realizando diagnóstico completo del sistema eléctrico y mecánico",
        lastUpdated: "2024-01-15 14:30",
      },
      services: [
        {
          id: "1",
          name: "Diagnóstico",
          status: "completed",
          estimatedTime: "2 horas",
          actualTime: "1.5 horas",
        },
        {
          id: "2",
          name: "Reparación",
          status: "in-progress",
          estimatedTime: "4 horas",
        },
        {
          id: "3",
          name: "Pruebas",
          status: "pending",
          estimatedTime: "1 hora",
        },
        {
          id: "4",
          name: "Entrega",
          status: "pending",
          estimatedTime: "30 min",
        },
      ],
      statusHistory: [
        {
          id: "1",
          stage: "Recepción",
          title: "Vehículo recibido",
          description: "Su vehículo ha sido recibido en nuestro taller y registrado en el sistema",
          timestamp: "2024-01-15 09:00",
          imageUrl: "/assets/img/recepcion.png",
          completed: true,
        },
        {
          id: "2",
          stage: "Diagnóstico inicial",
          title: "Diagnóstico completado",
          description: "Se ha completado el diagnóstico inicial. Problemas detectados en el sistema de frenos",
          timestamp: "2024-01-15 11:30",
          imageUrl: "/assets/img/aceite.png",
          completed: true,
        },
        {
          id: "3",
          stage: "Reparación en curso",
          title: "Reparación iniciada",
          description: "Iniciamos la reparación del sistema de frenos. Tiempo estimado: 4 horas",
          timestamp: "2024-01-15 14:30",
          imageUrl: "/assets/img/tareas.png",
          completed: false,
        },
      ],
      estimatedCompletion: "2024-01-16 16:00",
      workshopInfo: {
        name: "Taller Mecánico Express",
        phone: "+51 999 888 777",
        email: "contacto@tallerexpress.com",
        address: "Av. Larco 123, Miraflores",
      },
    },
    TRK005678: {
      id: "2",
      trackingCode: "TRK005678",
      vehicleInfo: {
        licensePlate: "XYZ-789",
        brand: "Honda",
        model: "Civic",
        year: 2019,
        color: "Azul",
        vin: "2HGFC2F59KH123456",
      },
      currentStatus: {
        currentStage: "Listo para entrega",
        progress: 100,
        description: "Su vehículo está listo para ser retirado",
        lastUpdated: "2024-01-15 16:45",
      },
      services: [
        {
          id: "1",
          name: "Cambio de aceite",
          status: "completed",
          estimatedTime: "30 min",
          actualTime: "25 min",
        },
        {
          id: "2",
          name: "Revisión general",
          status: "completed",
          estimatedTime: "1 hora",
          actualTime: "45 min",
        },
        {
          id: "3",
          name: "Limpieza",
          status: "completed",
          estimatedTime: "30 min",
          actualTime: "30 min",
        },
      ],
      statusHistory: [
        {
          id: "1",
          stage: "Recepción",
          title: "Vehículo recibido",
          description: "Su vehículo ha sido recibido para mantenimiento preventivo",
          timestamp: "2024-01-15 08:00",
          imageUrl: "/assets/img/recepcion.png",
          completed: true,
        },
        {
          id: "2",
          stage: "Mantenimiento",
          title: "Mantenimiento completado",
          description: "Se realizó cambio de aceite y revisión general del vehículo",
          timestamp: "2024-01-15 10:30",
          imageUrl: "/assets/img/aceite.png",
          completed: true,
        },
        {
          id: "3",
          stage: "Finalizado",
          title: "Trabajo completado",
          description: "Su vehículo está listo para ser retirado. Puede pasar a recogerlo",
          timestamp: "2024-01-15 16:45",
          imageUrl: "/assets/img/tareas.png",
          completed: true,
        },
      ],
      estimatedCompletion: "2024-01-15 17:00",
      workshopInfo: {
        name: "Taller San Isidro",
        phone: "+51 999 777 666",
        email: "contacto@tallersanisidro.com",
        address: "Av. Javier Prado 456, San Isidro",
      },
    },
  }

  constructor() {}

  getVehicleTracking(code: string): Observable<VehicleTracking> {
    return new Observable((observer) => {
      // Simular delay de red
      setTimeout(() => {
        const tracking = this.mockTrackingData[code]
        if (tracking) {
          observer.next(tracking)
          observer.complete()
        } else {
          observer.error(new Error("Código de seguimiento no encontrado"))
        }
      }, 1000)
    })
  }

  validateTrackingCode(request: TrackingCodeRequest): Observable<boolean> {
    return of(!!this.mockTrackingData[request.code]).pipe(delay(500))
  }
}
