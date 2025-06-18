import { Component } from "@angular/core"
import {
   FormBuilder,
   FormGroup,
  Validators,
  ReactiveFormsModule,
   AbstractControl,
   ValidationErrors,
} from "@angular/forms"
import  { Router } from "@angular/router"
import { CommonModule } from "@angular/common"
import { LanguageSwitcherComponent } from "../../../shared/components/language-switcher/language-switcher.component"
import  { I18nService } from "../../../shared/services/i18n.service"

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LanguageSwitcherComponent],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  registerForm: FormGroup
  isSubmitting = false
  errorMessage: string | null = null

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private i18nService: I18nService,
  ) {
    this.registerForm = this.formBuilder.group(
      {
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

    const { email, password } = this.registerForm.value

    // Simular registro exitoso y redirigir al login
    setTimeout(() => {
      this.isSubmitting = false
      this.router.navigate(["/workshop/login"])
    }, 1000)

    // Comentado para la demo
    /*
    this.authService.register({ email, password }).subscribe({
      next: () => {
        this.router.navigate(['/workshop/login']);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error?.error?.message || this.translate('register.error.message');
      }
    });
    */
  }

  navigateToLogin(): void {
    this.router.navigate(["/workshop/login"])
  }

  translate(key: string): string {
    return this.i18nService.translate(key)
  }
}
