import { Component } from "@angular/core"
import {  FormBuilder,  FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import  { Router } from "@angular/router"
import { CommonModule } from "@angular/common"
import { LanguageSwitcherComponent } from "../../../shared/components/language-switcher/language-switcher.component"
import  { I18nService } from "../../../shared/services/i18n.service"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LanguageSwitcherComponent],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  loginForm: FormGroup
  isSubmitting = false
  errorMessage: string | null = null

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private i18nService: I18nService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return
    }

    this.isSubmitting = true
    this.errorMessage = null

    const { email, password } = this.loginForm.value

    // Para la demo, vamos directamente al dashboard
    this.router.navigate(["/workshop/dashboard"])
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
