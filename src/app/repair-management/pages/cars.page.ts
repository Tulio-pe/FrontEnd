import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatCardModule } from "@angular/material/card"
import { MatDialogModule,  MatDialog } from "@angular/material/dialog"
import  { Observable } from "rxjs"
import  { VehicleService } from "../services/vehicle.service"
import  { RepairService } from "../services/repair.service"
import { CreateVehicleDialogComponent } from "../components/create-vehicle-dialog/create-vehicle-dialog.component"
import  { Vehicle } from "../models"
import  { I18nService } from "../../shared/services/i18n.service"

/**
 * Vehicle management page for workshop operations.
 */
@Component({
  selector: "app-cars",
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, MatDialogModule],
  templateUrl: "./cars.page.html",
  styleUrls: ["./cars.page.css"],
})
export class CarsPage implements OnInit {
  vehicles$: Observable<Vehicle[]>

  constructor(
    private vehicleService: VehicleService,
    private repairService: RepairService,
    private dialog: MatDialog,
    private i18nService: I18nService,
  ) {
    this.vehicles$ = this.vehicleService.getVehicles()
  }

  ngOnInit() {}

  /**
   * Opens dialog to register new vehicle.
   */
  openCreateVehicleDialog() {
    const dialogRef = this.dialog.open(CreateVehicleDialogComponent, {
      width: "500px",
      disableClose: true,
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("Vehículo creado:", result)
      }
    })
  }

  /**
   * Initiates repair process for selected vehicle.
   */
  startRepair(vehicle: Vehicle) {
    // Crear una reparación automáticamente para este vehículo
    const repairRequest = {
      plateNumber: vehicle.plateNumber,
      vehicleInfo: {
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        color: vehicle.color,
        vin: vehicle.vin,
      },
      services: ["Diagnóstico general"], // Servicio por defecto
    }

    this.repairService.createRepair(repairRequest).subscribe({
      next: (repair) => {
        // Marcar el vehículo como en reparación
        this.vehicleService.updateVehicleRepairStatus(vehicle.id, true).subscribe()
        console.log("Reparación iniciada:", repair)
      },
      error: (error) => {
        console.error("Error al iniciar reparación:", error)
      },
    })
  }

  translate(key: string): string {
    return this.i18nService.translate(key)
  }
}

export default CarsPage
