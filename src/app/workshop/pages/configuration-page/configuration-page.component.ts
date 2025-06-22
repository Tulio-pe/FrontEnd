import { Component } from '@angular/core';
import {MatButtonToggleGroup, MatButtonToggleModule} from '@angular/material/button-toggle';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ScheduleHoursComponent} from '../../components/schedule-hours/schedule-hours.component';
import {WorkshopInfoComponent} from '../../components/workshop-info/workshop-info.component';

@Component({
  selector: 'app-configuration-page',
  imports: [
    MatButtonToggleGroup,
    MatButtonToggleModule,
    FormsModule,
    NgIf,
    ScheduleHoursComponent,
    WorkshopInfoComponent,
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
