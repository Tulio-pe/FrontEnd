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

/**
 * Vehicle tracking input page component.
 * Allows customers to enter tracking codes to view their vehicle's repair status.
 */
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
  // Form for tracking code input
  trackingForm: FormGroup
  // Loading state for form submission
  loading = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private trackingService: VehicleTrackingService,
    private snackBar: MatSnackBar,
    private i18nService: I18nService,
  ) {
    // Initialize form with validation rules
    this.trackingForm = this.fb.group({
      code: ["", [Validators.required, Validators.minLength(6)]],
    })
  }

  /**
   * Handles form submission and tracking code validation.
   * Navigates to detail page if code is valid.
   */
  onSubmit() {
    if (this.trackingForm.valid) {
      this.loading = true
      const code = this.trackingForm.get("code")?.value

      this.trackingService.validateTrackingCode({ code }).subscribe({
        next: (isValid) => {
          this.loading = false
          if (isValid) {
            // Navigate to tracking detail page
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

  /**
   * Displays error message using Material snackbar.
   */
  private showError(message: string) {
    this.snackBar.open(message, "Cerrar", {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
    })
  }

  /**
   * Translates text using i18n service.
   */
  translate(key: string): string {
    return this.i18nService.translate(key)
  }

  /**
   * Helper method for testing - fills form with example codes.
   */
  useExampleCode(code: string) {
    this.trackingForm.patchValue({ code })
  }
}
