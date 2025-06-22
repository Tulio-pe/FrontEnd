import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  FormBuilder,  FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import {  MatDialogRef, MatDialogModule } from "@angular/material/dialog"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import  { VehicleService } from "../../services/vehicle.service"
import  { I18nService } from "../../../shared/services/i18n.service"

@Component({
  selector: "app-create-vehicle-dialog",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: "./create-vehicle-dialog.component.html",
  styleUrls: ["./create-vehicle-dialog.component.css"],
})
export class CreateVehicleDialogComponent {
  vehicleForm: FormGroup
  isSubmitting = false

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateVehicleDialogComponent>,
    private vehicleService: VehicleService,
    private i18nService: I18nService,
  ) {
    this.vehicleForm = this.fb.group({
      plateNumber: ["", [Validators.required, Validators.pattern(/^[A-Z0-9]{3}-[A-Z0-9]{3}$/)]],
      brand: ["", Validators.required],
      model: ["", Validators.required],
      year: ["", [Validators.required, Validators.min(1990), Validators.max(new Date().getFullYear())]],
      color: ["", Validators.required],
      vin: [""],
    })
  }

  onSubmit() {
    if (this.vehicleForm.valid) {
      this.isSubmitting = true

      this.vehicleService.createVehicle(this.vehicleForm.value).subscribe({
        next: (vehicle) => {
          this.dialogRef.close(vehicle)
        },
        error: (error) => {
          console.error("Error creating vehicle:", error)
          this.isSubmitting = false
        },
      })
    }
  }

  onCancel() {
    this.dialogRef.close()
  }

  translate(key: string): string {
    return this.i18nService.translate(key)
  }
}
