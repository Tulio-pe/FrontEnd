import { Component } from '@angular/core';
import {MatButtonToggleGroup, MatButtonToggleModule} from '@angular/material/button-toggle';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-configuration-page',
  imports: [
    MatButtonToggleGroup,
    MatButtonToggleModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './configuration-page.component.html',
  styleUrl: './configuration-page.component.css'
})
export class ConfigurationPageComponent {
  selectedTab: string = 'perfil'; // Initial Value


  onTabChange(event: any) {
    this.selectedTab = event.value;
  }
}
