import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatIconModule } from "@angular/material/icon"
import { WorkshopFiltersComponent } from "../../components/workshop-filters/workshop-filters.component"
import { WorkshopCardComponent } from "../../components/workshop-card/workshop-card.component"
import { MainHeaderComponent } from "../../../shared/components/main-header/main-header.component"
import  { WorkshopDiscoveryService } from "../../services/workshop-discovery.service"
import  { Workshop, WorkshopFilters } from "../../models"
import  { I18nService } from "../../../shared/services/i18n.service"

@Component({
  selector: "app-workshop-list",
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    WorkshopFiltersComponent,
    WorkshopCardComponent,
    MainHeaderComponent,
  ],
  templateUrl: "./workshop-list.page.html",
  styleUrls: ["./workshop-list.page.css"],
})
export default class WorkshopListPage implements OnInit {
  workshops: Workshop[] = []
  loading = false
  currentFilters: WorkshopFilters = {
    region: "",
    province: "",
    district: "",
    specialty: "",
  }

  constructor(
    private workshopService: WorkshopDiscoveryService,
    private i18nService: I18nService,
  ) {}

  ngOnInit() {
    this.loadWorkshops()
  }

  onFiltersChange(filters: WorkshopFilters) {
    this.currentFilters = filters
    this.loadWorkshops()
  }

  translate(key: string): string {
    return this.i18nService.translate(key)
  }

  private loadWorkshops() {
    this.loading = true
    this.workshopService.getWorkshops(this.currentFilters).subscribe({
      next: (workshops) => {
        this.workshops = workshops
        this.loading = false
      },
      error: (error) => {
        console.error("Error loading workshops:", error)
        this.loading = false
      },
    })
  }
}
