import { Injectable, inject } from "@angular/core"
import { type Observable, of } from "rxjs"
import { map, catchError } from "rxjs/operators"
import { HttpClient } from "@angular/common/http"
import type { Workshop, WorkshopFilters, FilterOption } from "../models"
import { environment } from "../../../environment/environment"

@Injectable({
  providedIn: "root",
})
export class WorkshopDiscoveryService {
  private http = inject(HttpClient)
  private apiUrl = environment.apiUrl

  getWorkshops(filters?: WorkshopFilters): Observable<Workshop[]> {
    // Llamada real al backend
    return this.http.get<Workshop[]>(`${this.apiUrl}${environment.endpoints.workshops}`).pipe(
      map((workshops) => {
        if (!filters) return workshops
        // Mantener tu lógica de filtros existente
        return workshops.filter((workshop) => {
          const regionMatch = !filters.region || workshop.region === filters.region
          const provinceMatch = !filters.province || workshop.province === filters.province
          const districtMatch = !filters.district || workshop.district === filters.district
          const specialtyMatch = !filters.specialty || workshop.specialties.includes(filters.specialty)
          return regionMatch && provinceMatch && districtMatch && specialtyMatch
        })
      }),
      catchError((error) => {
        console.error("Error fetching workshops:", error)
        // Fallback a array vacío en caso de error
        return of([])
      }),
    )
  }

  getWorkshopById(id: string): Observable<Workshop | null> {
    return this.http.get<Workshop>(`${this.apiUrl}${environment.endpoints.workshops}/${id}`).pipe(
      catchError((error) => {
        console.error("Error fetching workshop by id:", error)
        return of(null)
      }),
    )
  }

  getWorkshopByName(name: string): Observable<Workshop | null> {
    // Nuevo método para tu endpoint GET /api/v1/workshops/{workshopName}
    return this.http.get<Workshop>(`${this.apiUrl}${environment.endpoints.workshops}/${name}`).pipe(
      catchError((error) => {
        console.error("Error fetching workshop by name:", error)
        return of(null)
      }),
    )
  }

  createWorkshop(workshop: Workshop): Observable<Workshop> {
    return this.http.post<Workshop>(`${this.apiUrl}${environment.endpoints.workshops}`, workshop).pipe(
      catchError((error) => {
        console.error("Error creating workshop:", error)
        throw error
      }),
    )
  }

  // Mantener tus métodos de filtros existentes (estos pueden seguir siendo locales)
  getRegions(): Observable<FilterOption[]> {
    return of([
      { value: "", label: "filters.all.regions" },
      { value: "lima", label: "Lima" },
      { value: "arequipa", label: "Arequipa" },
      { value: "cusco", label: "Cusco" },
    ])
  }

  getProvinces(region: string): Observable<FilterOption[]> {
    const provinces =
      region === "lima"
        ? [
          { value: "", label: "filters.all.provinces" },
          { value: "lima", label: "Lima" },
          { value: "callao", label: "Callao" },
        ]
        : region === "arequipa"
          ? [
            { value: "", label: "filters.all.provinces" },
            { value: "arequipa", label: "Arequipa" },
          ]
          : [{ value: "", label: "filters.all.provinces" }]
    return of(provinces)
  }

  getDistricts(province: string): Observable<FilterOption[]> {
    const districts =
      province === "lima"
        ? [
          { value: "", label: "filters.all.districts" },
          { value: "miraflores", label: "Miraflores" },
          { value: "san-isidro", label: "San Isidro" },
          { value: "surco", label: "Surco" },
          { value: "la-molina", label: "La Molina" },
          { value: "barranco", label: "Barranco" },
        ]
        : province === "callao"
          ? [
            { value: "", label: "filters.all.districts" },
            { value: "callao", label: "Callao" },
          ]
          : [{ value: "", label: "filters.all.districts" }]
    return of(districts)
  }

  getSpecialties(): Observable<FilterOption[]> {
    return of([
      { value: "", label: "filters.all.specialties" },
      { value: "mecanica", label: "specialties.mechanics" },
      { value: "electricidad", label: "specialties.electricity" },
      { value: "pintura", label: "specialties.painting" },
      { value: "planchado", label: "specialties.bodywork" },
    ])
  }
}
