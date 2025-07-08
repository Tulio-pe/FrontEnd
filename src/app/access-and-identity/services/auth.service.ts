import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable, BehaviorSubject } from "rxjs"
import { tap, catchError } from "rxjs/operators"
import { User } from "../models/user.model"
import { environment } from "../../../environment/environment"

// Interfaces para la funcionalidad de horarios
interface ScheduleHours {
  [key: string]: {
    active: boolean;
    allDay?: boolean;
    hours?: Array<{start: string, end: string}>;
  };
}

interface ScheduleResponse {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Servicio de autenticación para login, registro y gestión de tokens.
 * Ahora conectado a la API real del backend.
 */
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = environment.apiUrl
  private currentUserSubject = new BehaviorSubject<User | null>(null)
  public currentUser$ = this.currentUserSubject.asObservable()
  private tokenKey = "auth_token"

  constructor(private http: HttpClient) {
    this.loadCurrentUser()
  }

  /**
   * Autentica usuario con email y contraseña usando el endpoint correcto.
   * CAMBIADO: Ahora usa signInEmail en lugar de signIn
   */
  login(email: string, password: string): Observable<any> {
    const loginData = { email, password }

    console.log("🚀 Enviando login a:", `${this.apiUrl}${environment.endpoints.auth.signInEmail}`)
    console.log("🚀 Con datos:", { email, password: "***" })

    // CORREGIDO: Usar signInEmail en lugar de signIn
    return this.http.post<any>(`${this.apiUrl}${environment.endpoints.auth.signInEmail}`, loginData).pipe(
      tap((response) => {
        console.log("📥 Respuesta completa de login:", JSON.stringify(response, null, 2))
        this.handleAnyResponse(response)
      }),
      catchError((error) => {
        console.error("❌ Error en login:", error)
        console.error("❌ Status:", error.status)
        console.error("❌ Error completo:", error.error)
        throw error
      }),
    )
  }

  /**
   * Registra nuevo usuario con el backend real.
   */
  register(userData: any): Observable<any> {
    console.log("🚀 Enviando datos de registro:", userData)

    return this.http.post<any>(`${this.apiUrl}${environment.endpoints.auth.signUp}`, userData).pipe(
      tap((response) => {
        console.log("📥 Respuesta completa de registro:", JSON.stringify(response, null, 2))
        console.log("📥 Tipo de respuesta:", typeof response)

        if (response) {
          console.log("📥 Keys disponibles:", Object.keys(response))
        }

        // Procesar la respuesta sin fallar
        this.handleAnyResponse(response)
      }),
      catchError((error) => {
        console.error("❌ Error completo en registro:", error)
        throw error
      }),
    )
  }

  /**
   * Iniciar sesión solo con email (método separado si lo necesitas).
   */
  signInWithEmail(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${environment.endpoints.auth.signInEmail}`, { email }).pipe(
      tap((response) => {
        console.log("📥 Respuesta de signInWithEmail:", response)
        this.handleAnyResponse(response)
      }),
    )
  }

  /**
   * Guarda los horarios del taller en el backend.
   */
  saveScheduleHours(scheduleData: ScheduleHours): Observable<ScheduleResponse> {
    console.log("🚀 Enviando datos de horario:", scheduleData)

    return this.http.post<ScheduleResponse>(`${this.apiUrl}${environment.endpoints.schedule.save}`, scheduleData).pipe(
      tap((response) => {
        console.log("📥 Respuesta de guardado de horario:", JSON.stringify(response, null, 2))
      }),
      catchError((error) => {
        console.error("❌ Error guardando horario:", error)
        throw error
      })
    )
  }

  /**
   * Cierra sesión del usuario actual y elimina el token.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey)
    this.currentUserSubject.next(null)
  }

  /**
   * Verifica si el usuario está autenticado basado en la presencia de un token.
   */
  isAuthenticated(): boolean {
    return !!this.getToken()
  }

  /**
   * Obtiene el token de autenticación del almacenamiento local.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey)
  }

  /**
   * Maneja cualquier tipo de respuesta del backend de forma segura
   */
  private handleAnyResponse(response: any): void {
    console.log("🔧 Procesando respuesta:", response)

    try {
      // Si no hay respuesta, salir
      if (!response) {
        console.warn("⚠️ Respuesta vacía")
        return
      }

      // Buscar token en cualquier lugar posible
      let token = null
      const possibleTokenKeys = ["token", "accessToken", "jwt", "authToken", "access_token"]

      for (const key of possibleTokenKeys) {
        if (response[key]) {
          token = response[key]
          console.log(`✅ Token encontrado en '${key}':`, token.substring(0, 20) + "...")
          break
        }
      }

      // Si no encontramos token, intentar en objetos anidados
      if (!token && response.data) {
        for (const key of possibleTokenKeys) {
          if (response.data[key]) {
            token = response.data[key]
            console.log(`✅ Token encontrado en 'data.${key}':`, token.substring(0, 20) + "...")
            break
          }
        }
      }

      if (!token) {
        console.warn("⚠️ No se encontró token en la respuesta")
        // Aún así, podemos continuar sin token para debugging
      }

      // Crear usuario básico
      const user: User = {
        id: this.extractValue(response, ["id", "userId", "user_id"]) || "temp-" + Date.now(),
        email: this.extractValue(response, ["email", "emailAddress", "user_email"]) || "",
        name: this.buildName(response) || "Usuario",
        token: token || "",
        username: this.extractValue(response, ["username", "user", "userName"]),
        firstName: this.extractValue(response, ["firstName", "first_name", "fname"]),
        lastName: this.extractValue(response, ["lastName", "last_name", "lname"]),
      }

      console.log("✅ Usuario final creado:", user)

      // Guardar token si existe
      if (token) {
        localStorage.setItem(this.tokenKey, token)
      }

      // Actualizar usuario actual
      this.currentUserSubject.next(user)
    } catch (error) {
      console.error("❌ Error procesando respuesta:", error)
      console.error("❌ Respuesta que causó el error:", response)
    }
  }

  /**
   * Extrae un valor de un objeto buscando en múltiples keys posibles
   */
  private extractValue(obj: any, keys: string[]): any {
    if (!obj) return null

    // Buscar en el objeto principal
    for (const key of keys) {
      if (obj[key] !== undefined && obj[key] !== null) {
        return obj[key]
      }
    }

    // Buscar en obj.user si existe
    if (obj.user) {
      for (const key of keys) {
        if (obj.user[key] !== undefined && obj.user[key] !== null) {
          return obj.user[key]
        }
      }
    }

    // Buscar en obj.data si existe
    if (obj.data) {
      for (const key of keys) {
        if (obj.data[key] !== undefined && obj.data[key] !== null) {
          return obj.data[key]
        }
      }
    }

    return null
  }

  /**
   * Construye el nombre del usuario de forma segura
   */
  private buildName(response: any): string {
    const firstName = this.extractValue(response, ["firstName", "first_name", "fname"])
    const lastName = this.extractValue(response, ["lastName", "last_name", "lname"])
    const username = this.extractValue(response, ["username", "user", "userName"])
    const email = this.extractValue(response, ["email", "emailAddress", "user_email"])

    if (firstName && lastName) {
      return `${firstName} ${lastName}`
    }
    if (username) {
      return username
    }
    if (email) {
      return email.split("@")[0] // Usar la parte antes del @
    }
    return "Usuario"
  }

  private loadCurrentUser(): void {
    const token = this.getToken()
    if (token) {
      const user: User = {
        email: "usuario@ejemplo.com",
        token: token,
      }
      this.currentUserSubject.next(user)
    }
  }
}
