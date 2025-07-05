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

/**
 * Vehicle tracking detail page component.
 * Displays comprehensive tracking information for a specific vehicle.
 */
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
  // Current tracking data
  tracking: VehicleTracking | null = null
  // Loading state for data fetching
  loading = true
  // Tracking code from route parameters
  trackingCode = ""

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trackingService: VehicleTrackingService,
    private i18nService: I18nService,
  ) {}

  ngOnInit() {
    // Get tracking code from route parameters
    this.trackingCode = this.route.snapshot.paramMap.get("code") || ""
    if (this.trackingCode) {
      this.loadTracking()
    } else {
      // Redirect if no tracking code provided
      this.router.navigate(["/vehicle-tracking"])
    }
  }

  /**
   * Loads tracking data from service.
   * Redirects to input page if tracking code not found.
   */
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

  /**
   * Opens phone dialer with workshop contact number.
   */
  contactWorkshop() {
    if (this.tracking?.workshopInfo.phone) {
      window.open(`tel:${this.tracking.workshopInfo.phone}`)
    }
  }

  /**
   * Returns CSS class for service status styling.
   */
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

  /**
   * Translates text using i18n service.
   */
  translate(key: string): string {
    return this.i18nService.translate(key)
  }

  /**
   * Translates service status with proper mapping.
   */
  translateServiceStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      completed: "tracking.status.completed",
      "in-progress": "tracking.status.in-progress",
      pending: "tracking.status.pending",
    }
    return this.translate(statusMap[status] || status)
  }
}
