import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import  { Router } from "@angular/router"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatSnackBarModule,  MatSnackBar } from "@angular/material/snack-bar"
import { MainHeaderComponent } from "../../../shared/components/main-header/main-header.component"
import  { VehicleTrackingService } from "../../services/vehicle-tracking.service"
import  { I18nService } from "../../../shared/services/i18n.service"

@Component({
  selector: "app-tracking-input",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MainHeaderComponent,
  ],
  templateUrl: "./tracking-input.page.html",
  styleUrls: ["./tracking-input.page.css"],
})
export default class TrackingInputPage {
  trackingForm: FormGroup
  loading = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private trackingService: VehicleTrackingService,
    private snackBar: MatSnackBar,
    private i18nService: I18nService,
  ) {
    this.trackingForm = this.fb.group({
      code: ["", [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmit() {
    if (this.trackingForm.valid) {
      this.loading = true
      const code = this.trackingForm.get("code")?.value

      this.trackingService.validateTrackingCode({ code }).subscribe({
        next: (isValid) => {
          this.loading = false
          if (isValid) {
            this.router.navigate(["/vehicle-tracking", code])
          } else {
            this.showError("Código de seguimiento no válido")
          }
        },
        error: (error) => {
          this.loading = false
          this.showError("Error al validar el código")
        },
      })
    }
  }

  private showError(message: string) {
    this.snackBar.open(message, "Cerrar", {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
    })
  }

  translate(key: string): string {
    return this.i18nService.translate(key)
  }

  // Método para testing - agregar códigos de ejemplo
  useExampleCode(code: string) {
    this.trackingForm.patchValue({ code })
  }
}
