import { Injectable, inject } from "@angular/core"
import { type Observable, of } from "rxjs"
import { map } from "rxjs/operators"
import type { Workshop, WorkshopFilters, FilterOption } from "../models"
import { FakeApiService } from "../../shared/services/fake-api.service"

@Injectable({
  providedIn: "root",
})
export class WorkshopDiscoveryService {
  private fakeApi = inject(FakeApiService)

  getWorkshops(filters?: WorkshopFilters): Observable<Workshop[]> {
    return this.fakeApi.getWorkshops().pipe(
      map((workshops) => {
        if (!filters) return workshops

        return workshops.filter((workshop) => {
          const regionMatch = !filters.region || workshop.region === filters.region
          const provinceMatch = !filters.province || workshop.province === filters.province
          const districtMatch = !filters.district || workshop.district === filters.district
          const specialtyMatch = !filters.specialty || workshop.specialties.includes(filters.specialty)

          return regionMatch && provinceMatch && districtMatch && specialtyMatch
        })
      }),
    )
  }

  getWorkshopById(id: string): Observable<Workshop | null> {
    return this.fakeApi.getWorkshopById(id)
  }

  createWorkshop(workshop: Workshop): Observable<Workshop> {
    return this.fakeApi.createWorkshop(workshop)
  }

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
