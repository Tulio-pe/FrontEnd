import { Component, inject } from "@angular/core"
import {
  FormBuilder,
  type FormGroup,
  Validators,
  ReactiveFormsModule,
  type AbstractControl,
  type ValidationErrors,
} from "@angular/forms"
import { Router } from "@angular/router"
import { CommonModule } from "@angular/common"
import { LanguageSwitcherComponent } from "../../../shared/components/language-switcher/language-switcher.component"
import { I18nService } from "../../../shared/services/i18n.service"
import { AuthService } from "../../services/auth.service"

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LanguageSwitcherComponent],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder)
  private router = inject(Router)
  private i18nService = inject(I18nService)
  private authService = inject(AuthService)

  registerForm: FormGroup
  isSubmitting = false
  errorMessage: string | null = null

  constructor() {
    this.registerForm = this.formBuilder.group(
      {
        username: ["", [Validators.required, Validators.minLength(3)]],
        firstName: ["", [Validators.required, Validators.minLength(2)]],
        lastName: ["", [Validators.required, Validators.minLength(2)]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required]],
      },
      { validators: this.passwordMatchValidator },
    )
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get("password")
    const confirmPassword = control.get("confirmPassword")

    if (!password || !confirmPassword || password.value === confirmPassword.value) {
      return null
    }

    return { passwordsNotMatching: true }
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return
    }

    this.isSubmitting = true
    this.errorMessage = null

    const { username, firstName, lastName, email, password } = this.registerForm.value

    console.log("🚀 Registrando usuario:", { username, firstName, lastName, email, password: "***" })

    // Llamada real al backend con el formato correcto
    this.authService.register({ username, firstName, lastName, email, password }).subscribe({
      next: (response) => {
        console.log("✅ Registro exitoso:", response)
        this.isSubmitting = false

        // Mostrar mensaje de éxito y redirigir al login usando la ruta correcta
        alert("¡Registro exitoso! Ahora puedes iniciar sesión.")
        this.router.navigate(["/workshop/login"])
      },
      error: (error) => {
        console.error("❌ Error en registro:", error)
        this.isSubmitting = false

        // Manejar diferentes tipos de errores
        if (error.status === 400) {
          this.errorMessage = error.error?.message || this.translate("register.error.validation")
        } else if (error.status === 409) {
          this.errorMessage = this.translate("register.error.email.exists")
        } else if (error.status === 0) {
          this.errorMessage = this.translate("register.error.connection")
        } else {
          this.errorMessage = error.error?.message || this.translate("register.error.message")
        }
      },
    })
  }

  navigateToLogin(): void {
    this.router.navigate(["/workshop/login"])
  }

  translate(key: string): string {
    return this.i18nService.translate(key)
  }
}
