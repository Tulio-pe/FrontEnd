import { Component, inject } from "@angular/core"
import { FormBuilder, type FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { CommonModule } from "@angular/common"
import { LanguageSwitcherComponent } from "../../../shared/components/language-switcher/language-switcher.component"
import { I18nService } from "../../../shared/services/i18n.service"
import { AuthService } from "../../services/auth.service"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LanguageSwitcherComponent],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder)
  private router = inject(Router)
  private i18nService = inject(I18nService)
  private authService = inject(AuthService)

  loginForm: FormGroup
  isSubmitting = false
  errorMessage: string | null = null

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    })

    // REMOVIDO: La verificación automática que causaba la redirección inmediata
    // Ahora el usuario puede quedarse en la página de login
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched()
      return
    }

    this.isSubmitting = true
    this.errorMessage = null

    const { email, password } = this.loginForm.value

    console.log("🚀 Intentando login con:", { email, password: "***" })

    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log("✅ Login exitoso:", response)
        this.isSubmitting = false

        // SOLO aquí redirigimos al dashboard después del login exitoso
        this.router.navigate(["/workshop/dashboard"])
      },
      error: (error) => {
        console.error("❌ Error en login:", error)
        this.isSubmitting = false

        // Manejar diferentes tipos de errores
        if (error.status === 401) {
          this.errorMessage = this.translate('login.error.invalid.credentials')
        } else if (error.status === 404) {
          this.errorMessage = this.translate('login.error.user.not.found')
        } else if (error.status === 0) {
          this.errorMessage = this.translate('login.error.connection')
        } else {
          this.errorMessage = this.translate('login.error.generic')
        }
      }
    })
  }

  /**
   * Marca todos los campos del formulario como tocados para mostrar errores
   */
  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key)
      control?.markAsTouched()
    })
  }

  /**
   * Limpia el mensaje de error cuando el usuario empieza a escribir
   */
  onInputChange(): void {
    if (this.errorMessage) {
      this.errorMessage = null
    }
  }

  navigateToRegister(): void {
    this.router.navigate(["/workshop/register"])
  }

  navigateToWorkshops(): void {
    this.router.navigate(["/workshops"])
  }

  translate(key: string): string {
    return this.i18nService.translate(key)
  }
}
