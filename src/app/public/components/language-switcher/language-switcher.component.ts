import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';

@Component({
  selector: 'app-language-switcher',
  imports: [
    MatButtonToggleGroup,
    MatButtonToggle

  ],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent {
  currentLang = 'en';
  languages = ['en', 'es'];
  /**
   * Creates an instance of the LanguageSwitcherComponent.
   * @param {TranslateService} translate - The TranslateService from ngx-translate used for language management.
   * @constructor
   * @description
   * The constructor initializes the `currentLang` with the current language of the application, which is fetched from the `TranslateService`.
   */
  constructor(private translate: TranslateService) {
    this.currentLang = translate.currentLang;
  }
  /**
   * Switches the language of the application.
   * @param {string} language - The language code to switch to (e.g., 'en' or 'es').
   * @description
   * This method updates the language of the application by calling `translate.use()` from ngx-translate.
   * The `currentLang` property is updated to reflect the selected language.
   */
  useLanguage(language: string) {
    this.translate.use(language);
  }
}
