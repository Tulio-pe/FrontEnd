import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // Ajustar según la API real
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {
    this.loadCurrentUser();
  }
  login(email: string, password: string): Observable<AuthResponse> {
    // Simulación de login para desarrollo
    const mockResponse: AuthResponse = {
      user: {
        id: 1,
        name: 'Usuario de Prueba',
        email: email
      },
      token: 'token-simulado-123456'
    };

    // Simulamos un retardo como si fuera una petición real
    return new Observable<AuthResponse>(observer => {
      setTimeout(() => {
        this.handleAuthentication(mockResponse);
        observer.next(mockResponse);
        observer.complete();
      }, 800);
    });
    
    // Descomenta este código cuando tengas un backend real:
    /*
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(response => this.handleAuthentication(response))
      );
    */
  }
  register(userData: any): Observable<AuthResponse> {
    // Simulación de registro para desarrollo
    const mockResponse: AuthResponse = {
      user: {
        id: 1,
        name: userData.name,
        email: userData.email
      },
      token: 'token-simulado-123456'
    };

    // Simulamos un retardo como si fuera una petición real
    return new Observable<AuthResponse>(observer => {
      setTimeout(() => {
        this.handleAuthentication(mockResponse);
        observer.next(mockResponse);
        observer.complete();
      }, 800);
    });
    
    // Descomenta este código cuando tengas un backend real:
    /*
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, userData)
      .pipe(
        tap(response => this.handleAuthentication(response))
      );
    */
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private handleAuthentication(authResponse: AuthResponse): void {
    const user: User = {
      id: authResponse.user.id,
      name: authResponse.user.name,
      email: authResponse.user.email,
      token: authResponse.token
    };
    
    localStorage.setItem(this.tokenKey, authResponse.token);
    this.currentUserSubject.next(user);
  }

  private loadCurrentUser(): void {
    const token = this.getToken();
    if (token) {
      // Aquí podrías hacer una petición para obtener los datos del usuario actual
      // O implementar una decodificación del token JWT si contiene la información del usuario
      // Por simplicidad, solo establecemos un usuario básico
      const user: User = {
        email: 'usuario@ejemplo.com',
        token: token
      };
      this.currentUserSubject.next(user);
    }
  }
}
