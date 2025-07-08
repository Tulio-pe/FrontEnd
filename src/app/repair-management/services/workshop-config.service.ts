import { Injectable, inject } from "@angular/core"
import {Observable, of} from "rxjs"
import { catchError } from "rxjs/operators"
import { HttpClient } from "@angular/common/http"
import type { WorkshopProfile, WorkshopSchedule } from "../models"
import { environment } from "../../../environment/environment"

@Injectable({
  providedIn: "root",
})
export class WorkshopConfigService {
  private http = inject(HttpClient)
  private apiUrl = environment.apiUrl

  getProfile(): Observable<WorkshopProfile> {
    return this.http.get<WorkshopProfile>(`${this.apiUrl}/workshop/profile`).pipe(
      catchError((error) => {
        console.error("Error fetching workshop| profile:", error)
        throw error
      }),
    )
  }

  updateProfile(profile: WorkshopProfile): Observable<WorkshopProfile> {
    return this.http.put<WorkshopProfile>(`${this.apiUrl}/workshop/profile`, profile).pipe(
      catchError((error) => {
        console.error("Error updating workshop profile:", error)
        throw error
      }),
    )
  }

  getSchedule(): Observable<WorkshopSchedule> {
    return this.http.get<WorkshopSchedule>(`${this.apiUrl}/workshop/schedule`).pipe(
      catchError((error) => {
        console.error("Error fetching workshop schedule:", error)
        throw error
      }),
    )
  }

  updateSchedule(schedule: WorkshopSchedule): Observable<WorkshopSchedule> {
    return this.http.put<WorkshopSchedule>(`${this.apiUrl}/workshop/schedule`, schedule).pipe(
      catchError((error) => {
        console.error("Error updating workshop schedule:", error)
        throw error
      }),
    )
  }

  getAvailableServices(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/workshop/services`).pipe(
      catchError((error) => {
        console.error("Error fetching available services:", error)
        // Fallback a servicios por defecto
        return of ([
          "Cambio aceite",
          "Transmisión",
          "Refrigeración",
          "Frenos",
          "Suspensión",
          "Electricidad",
          "Pintura",
          "Planchado",
          "Llantas nuevas",
          "Llantas usadas",
        ])
      }),
    )
  }

  // Helper methods to get current data
  getCurrentProfile(): Observable<WorkshopProfile> {
    return this.getProfile()
  }

  getCurrentSchedule(): Observable<WorkshopSchedule> {
    return this.getSchedule()
  }
}
