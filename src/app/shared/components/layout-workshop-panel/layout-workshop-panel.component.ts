import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterOutlet } from "@angular/router"
import { WorkshopSidebarComponent } from "../workshop-sidebar/workshop-sidebar.component"

@Component({
  selector: "app-layout-workshop-panel",
  standalone: true,
  imports: [CommonModule, RouterOutlet, WorkshopSidebarComponent],
  templateUrl: "./layout-workshop-panel.component.html",
  styleUrls: ["./layout-workshop-panel.component.css"],
})
export class LayoutWorkshopPanelComponent {}
