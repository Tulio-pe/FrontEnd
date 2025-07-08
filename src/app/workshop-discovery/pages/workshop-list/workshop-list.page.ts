import { Component, type OnInit, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatSelectModule } from "@angular/material/select"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { FormsModule } from "@angular/forms"
import { WorkshopDiscoveryService } from "../../services/workshop-discovery.service"
import { I18nService } from "../../../shared/services/i18n.service"
import type { Workshop, WorkshopFilters, FilterOption } from "../../models"
import { type Observable, of } from "rxjs"
import {WorkshopCardComponent} from '../../components/workshop-card/workshop-card.component';
import {WorkshopFiltersComponent} from '../../components/workshop-filters/workshop-filters.component';
import {MainHeaderComponent} from '../../../shared/components/main-header/main-header.component';

@Component({
  selector: "app-workshop-list",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    WorkshopCardComponent,
    WorkshopFiltersComponent,
    MainHeaderComponent,
  ],
  templateUrl: "./workshop-list.page.html",
  styleUrls: ["./workshop-list.page.css"],
})
export default class WorkshopListPage implements OnInit {
  private workshopService = inject(WorkshopDiscoveryService)
  private i18nService = inject(I18nService)

  workshops: Workshop[] = []
  loading = true

  filters: WorkshopFilters = {
    region: "",
    province: "",
    district: "",
    specialty: "",
  }

  regions$: Observable<FilterOption[]> = of([])
  provinces$: Observable<FilterOption[]> = of([])
  districts$: Observable<FilterOption[]> = of([])
  specialties$: Observable<FilterOption[]> = of([])

  ngOnInit() {
    this.loadFilters()
    this.loadWorkshops()
  }

  private loadFilters() {
    this.regions$ = this.workshopService.getRegions()
    this.provinces$ = this.workshopService.getProvinces(this.filters.region)
    this.districts$ = this.workshopService.getDistricts(this.filters.province)
    this.specialties$ = this.workshopService.getSpecialties()
  }

  private loadWorkshops() {
    this.loading = true
    this.workshopService.getWorkshops(this.filters).subscribe({
      next: (workshops) => {
        this.workshops = workshops
        this.loading = false
      },
      error: (error) => {
        console.error("Error loading workshops:", error)
        this.workshops = []
        this.loading = false
      },
    })
  }

  onRegionChange() {
    this.filters.province = ""
    this.filters.district = ""
    this.provinces$ = this.workshopService.getProvinces(this.filters.region)
    this.districts$ = this.workshopService.getDistricts("")
    this.loadWorkshops()
  }

  onProvinceChange() {
    this.filters.district = ""
    this.districts$ = this.workshopService.getDistricts(this.filters.province)
    this.loadWorkshops()
  }

  onDistrictChange() {
    this.loadWorkshops()
  }

  onSpecialtyChange() {
    this.loadWorkshops()
  }

  translate(key: string): string {
    return this.i18nService.translate(key)
  }

  onFiltersChange(newFilters: WorkshopFilters) {
    this.filters = { ...newFilters }

    // Update dependent filters
    if (this.filters.region !== newFilters.region) {
      this.provinces$ = this.workshopService.getProvinces(this.filters.region)
      this.districts$ = this.workshopService.getDistricts("")
    }

    if (this.filters.province !== newFilters.province) {
      this.districts$ = this.workshopService.getDistricts(this.filters.province)
    }

    // Reload workshops with new filters
    this.loadWorkshops()
  }
}
