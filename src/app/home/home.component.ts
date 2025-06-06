import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../access-and-identity/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <header>
        <h1>Tallerazo</h1>
        <nav>
          <button (click)="logout()" class="logout-btn">Cerrar sesión</button>
        </nav>
      </header>
      
      <main>
        <h2>Bienvenido a Tallerazo</h2>
        <p>Has iniciado sesión correctamente.</p>
      </main>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
    }
    
    .logout-btn {
      padding: 8px 16px;
      background-color: #6c757d;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .logout-btn:hover {
      background-color: #5a6268;
    }
  `]
})
export class HomeComponent {
  constructor(private authService: AuthService) {}
  
  logout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }
}
