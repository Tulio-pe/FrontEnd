import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatTabsModule } from "@angular/material/tabs"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatCardModule } from "@angular/material/card"
import { MatChipsModule } from "@angular/material/chips"
import { MatDialogModule,  MatDialog } from "@angular/material/dialog"
import  { Observable } from "rxjs"
import  { RepairService } from "../services/repair.service"
import { CreateRepairDialogComponent } from "../components/create-repair-dialog/create-repair-dialog.component"
import  { Repair, RepairStatus } from "../models"
import  { I18nService } from "../../shared/services/i18n.service"

/**
 * Dashboard page for managing workshop repairs.
 * Provides tabbed interface organized by repair status.
 */
@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
  ],
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.css"],
})
export class DashboardPage implements OnInit {
  repairs$: Observable<Repair[]>
  selectedTabIndex = 0

  repairStatuses: { status: RepairStatus; label: string }[] = [
    { status: "por-revisar", label: "dashboard.status.to-review" },
    { status: "en-revision", label: "dashboard.status.in-review" },
    { status: "revisado", label: "dashboard.status.reviewed" },
    { status: "entregado", label: "dashboard.status.delivered" },
  ]

  constructor(
    private repairService: RepairService,
    private dialog: MatDialog,
    private i18nService: I18nService,
  ) {
    this.repairs$ = this.repairService.getRepairs()
  }

  ngOnInit() {}

  getRepairsByStatus(status: RepairStatus): Observable<Repair[]> {
    return this.repairService.getRepairsByStatus(status)
  }

  /**
   * Opens dialog to create new repair order.
   */
  openCreateRepairDialog() {
    const dialogRef = this.dialog.open(CreateRepairDialogComponent, {
      width: "600px",
      disableClose: true,
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // La reparación ya se creó en el diálogo
        console.log("Reparación creada:", result)
      }
    })
  }

  /**
   * Changes repair status to next stage in workflow.
   */
  changeRepairStatus(repair: Repair) {
    const currentIndex = this.repairStatuses.findIndex((s) => s.status === repair.status)
    const nextIndex = (currentIndex + 1) % this.repairStatuses.length
    const nextStatus = this.repairStatuses[nextIndex].status

    this.repairService.updateRepairStatus(repair.id, nextStatus).subscribe((updatedRepair) => {
      console.log("Estado actualizado:", updatedRepair)
    })
  }

  getNextStatusLabel(currentStatus: RepairStatus): string {
    const currentIndex = this.repairStatuses.findIndex((s) => s.status === currentStatus)
    const nextIndex = (currentIndex + 1) % this.repairStatuses.length
    return this.translate(this.repairStatuses[nextIndex].label)
  }

  translate(key: string): string {
    return this.i18nService.translate(key)
  }
}

export default DashboardPage
