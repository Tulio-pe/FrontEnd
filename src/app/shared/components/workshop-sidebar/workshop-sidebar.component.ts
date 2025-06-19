import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { LanguageSwitcherComponent } from "../language-switcher/language-switcher.component"
import  { I18nService } from "../../services/i18n.service"

@Component({
  selector: "app-workshop-sidebar",
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule, LanguageSwitcherComponent],
  templateUrl: "./workshop-sidebar.component.html",
  styleUrls: ["./workshop-sidebar.component.css"],
})
export class WorkshopSidebarComponent {
  constructor(private i18nService: I18nService) {}

  translate(key: string): string {
    return this.i18nService.translate(key)
  }
}
