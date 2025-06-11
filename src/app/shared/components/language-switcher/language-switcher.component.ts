import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatMenuModule } from "@angular/material/menu"
import  { I18nService } from "../../services/i18n.service"

@Component({
  selector: "app-language-switcher",
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: "./language-switcher.component.html",
  styleUrls: ["./language-switcher.component.css"],
})
export class LanguageSwitcherComponent {
  currentLang$: typeof this.i18nService.currentLang$;

  constructor(private i18nService: I18nService) {
    this.currentLang$ = this.i18nService.currentLang$;
  }
  setLanguage(lang: string) {
    this.i18nService.setLanguage(lang)
  }

  getCurrentLanguage(): string {
    return this.i18nService.getCurrentLanguage()
  }
}
