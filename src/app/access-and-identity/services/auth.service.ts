import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AuthResponse } from '../models/auth-response.model';

/**
 * Authentication service for user login, registration, and token management.
 * Currently uses mock data for development.
 */
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
  
  /**
   * Authenticates user with email and password.
   * Currently uses mock data for development.
   * @param email - User's email address
   * @param password - User's password
   * @returns Observable with authentication response
   */
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
  
  /**
   * Registers new user (mock implementation).
   */
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

  /**
   * Logs out the current user and removes the token.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }

  /**
   * Checks if the user is authenticated based on the presence of a token.
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Retrieves the authentication token from local storage.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Saves workshop schedule configuration.
   */
  saveScheduleHours(scheduleData: any): Observable<any> {
    // Simulation for development
    return new Observable<any>(observer => {
      setTimeout(() => {
        // Store in localStorage to simulate backend persistence
        localStorage.setItem('workshopSchedule', JSON.stringify(scheduleData));
        observer.next({ success: true, message: 'Schedule saved successfully' });
        observer.complete();
      }, 800);
    });
    
    // Uncomment this code when you have a real backend:
    /*
    return this.http.post<any>(`${this.apiUrl}/workshop/schedule`, scheduleData)
      .pipe(
        tap(response => console.log('Schedule saved', response))
      );
    */
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
