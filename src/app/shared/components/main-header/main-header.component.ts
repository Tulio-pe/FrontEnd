import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import  { Router } from "@angular/router"
import { LanguageSwitcherComponent } from "../language-switcher/language-switcher.component"
import  { I18nService } from "../../services/i18n.service"

@Component({
  selector: "app-main-header",
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, LanguageSwitcherComponent],
  templateUrl: "./main-header.component.html",
  styleUrls: ["./main-header.component.css"],
})
export class MainHeaderComponent {
  @Input() showBackButton = false

  constructor(
    private router: Router,
    private i18nService: I18nService,
  ) {}

  goBack() {
    this.router.navigate(["/workshops"])
  }

  goToTracking() {
    this.router.navigate(["/vehicle-tracking"])
  }

  translate(key: string): string {
    return this.i18nService.translate(key)
  }
}
