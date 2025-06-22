import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import  { ActivatedRoute, Router } from "@angular/router"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatCardModule } from "@angular/material/card"
import { MatDividerModule } from "@angular/material/divider"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MainHeaderComponent } from "../../../shared/components/main-header/main-header.component"
import  { WorkshopDiscoveryService } from "../../services/workshop-discovery.service"
import  { Workshop } from "../../models"
import  { I18nService } from "../../../shared/services/i18n.service"

@Component({
  selector: "app-workshop-detail",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MainHeaderComponent,
  ],
  templateUrl: "./workshop-detail.page.html",
  styleUrls: ["./workshop-detail.page.css"],
})
export default class WorkshopDetailPage implements OnInit {
  workshop: Workshop | null = null
  loading = true

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workshopService: WorkshopDiscoveryService,
    private i18nService: I18nService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id")
    if (id) {
      this.loadWorkshop(id)
    } else {
      this.router.navigate(["/workshops"])
    }
  }

  private loadWorkshop(id: string) {
    this.workshopService.getWorkshopById(id).subscribe({
      next: (workshop) => {
        this.workshop = workshop
        this.loading = false
        if (!workshop) {
          this.router.navigate(["/workshops"])
        }
      },
      error: (error) => {
        console.error("Error loading workshop:", error)
        this.loading = false
        this.router.navigate(["/workshops"])
      },
    })
  }

  getStars(): boolean[] {
    if (!this.workshop) return []
    const rating = Math.floor(this.workshop.rating)
    return Array.from({ length: 5 }, (_, i) => i < rating)
  }

  translate(key: string): string {
    return this.i18nService.translate(key)
  }

  translateSpecialty(specialty: string): string {
    const specialtyMap: { [key: string]: string } = {
      mecanica: "specialties.mechanics",
      electricidad: "specialties.electricity",
      pintura: "specialties.painting",
      planchado: "specialties.bodywork",
    }
    return this.translate(specialtyMap[specialty] || specialty)
  }

  translateDay(day: string): string {
    const dayMap: { [key: string]: string } = {
      Lunes: "days.monday",
      Martes: "days.tuesday",
      Miércoles: "days.wednesday",
      Jueves: "days.thursday",
      Viernes: "days.friday",
      Sábado: "days.saturday",
      Domingo: "days.sunday",
    }
    return this.translate(dayMap[day] || day)
  }
}
