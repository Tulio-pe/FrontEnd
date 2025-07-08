import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import  { AuthService } from "../../../access-and-identity/services/auth.service"

@Component({
  selector: "app-test-connection",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="test-connection">
      <h3>Test Backend Connection</h3>
      <button (click)="testLogin()" [disabled]="loading">
        {{ loading ? "Testing..." : "Test Login" }}
      </button>
      <div *ngIf="result" class="result" [class.success]="success" [class.error]="!success">
        {{ result }}
      </div>
    </div>
  `,
  styles: [
    `
      .test-connection {
        padding: 20px;
        border: 1px solid #ccc;
        margin: 20px;
      }
      .result {
        margin-top: 10px;
        padding: 10px;
      }
      .success {
        background-color: #d4edda;
        color: #155724;
      }
      .error {
        background-color: #f8d7da;
        color: #721c24;
      }
    `,
  ],
})
export class TestConnectionComponent {
  loading = false
  result = ""
  success = false

  constructor(private authService: AuthService) {}

  testLogin() {
    this.loading = true
    this.result = ""

    // Test con credenciales de prueba
    this.authService.login("test@example.com", "password123").subscribe({
      next: (response) => {
        this.success = true
        this.result = `✅ Conexión exitosa! Token: ${response.token.substring(0, 20)}...`
        this.loading = false
      },
      error: (error) => {
        this.success = false
        this.result = `❌ Error de conexión: ${error.message || error.status}`
        console.error("Error completo:", error)
        this.loading = false
      },
    })
  }
}
