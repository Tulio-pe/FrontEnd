import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatChipsModule } from "@angular/material/chips"
import  { Router } from "@angular/router"
import  { Workshop } from "../../models"
import  { I18nService } from "../../../shared/services/i18n.service"

@Component({
  selector: "app-workshop-card",
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: "./workshop-card.component.html",
  styleUrls: ["./workshop-card.component.css"],
})
export class WorkshopCardComponent {
  @Input() workshop!: Workshop

  constructor(
    private router: Router,
    private i18nService: I18nService,
  ) {}

  getStars(): boolean[] {
    const rating = Math.floor(this.workshop.rating)
    return Array.from({ length: 5 }, (_, i) => i < rating)
  }

  viewDetails() {
    this.router.navigate(["/workshops", this.workshop.id])
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
}
