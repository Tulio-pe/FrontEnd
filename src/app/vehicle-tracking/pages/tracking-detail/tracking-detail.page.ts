import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import  { ActivatedRoute, Router } from "@angular/router"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatCardModule } from "@angular/material/card"
import { MatChipsModule } from "@angular/material/chips"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatDividerModule } from "@angular/material/divider"
import { MainHeaderComponent } from "../../../shared/components/main-header/main-header.component"
import  { VehicleTrackingService } from "../../services/vehicle-tracking.service"
import  { VehicleTracking } from "../../models"
import  { I18nService } from "../../../shared/services/i18n.service"

@Component({
  selector: "app-tracking-detail",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MainHeaderComponent,
  ],
  templateUrl: "./tracking-detail.page.html",
  styleUrls: ["./tracking-detail.page.css"],
})
export default class TrackingDetailPage implements OnInit {
  tracking: VehicleTracking | null = null
  loading = true
  trackingCode = ""

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trackingService: VehicleTrackingService,
    private i18nService: I18nService,
  ) {}

  ngOnInit() {
    this.trackingCode = this.route.snapshot.paramMap.get("code") || ""
    if (this.trackingCode) {
      this.loadTracking()
    } else {
      this.router.navigate(["/vehicle-tracking"])
    }
  }

  private loadTracking() {
    this.trackingService.getVehicleTracking(this.trackingCode).subscribe({
      next: (tracking) => {
        this.tracking = tracking
        this.loading = false
      },
      error: (error) => {
        console.error("Error loading tracking:", error)
        this.loading = false
        this.router.navigate(["/vehicle-tracking"])
      },
    })
  }

  contactWorkshop() {
    if (this.tracking?.workshopInfo.phone) {
      window.open(`tel:${this.tracking.workshopInfo.phone}`)
    }
  }

  getServiceStatusClass(status: string): string {
    switch (status) {
      case "completed":
        return "completed"
      case "in-progress":
        return "in-progress"
      case "pending":
        return "pending"
      default:
        return "pending"
    }
  }

  translate(key: string): string {
    return this.i18nService.translate(key)
  }

  translateServiceStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      completed: "tracking.status.completed",
      "in-progress": "tracking.status.in-progress",
      pending: "tracking.status.pending",
    }
    return this.translate(statusMap[status] || status)
  }
}
