import { Component } from '@angular/core';
import {WorkshopInfoComponent} from '../../components/workshop-info/workshop-info.component';
import {ScheduleHoursComponent} from '../../components/schedule-hours/schedule-hours.component';

@Component({
  selector: 'app-onboarding-workshop-info-page',
  imports: [
    WorkshopInfoComponent,
    ScheduleHoursComponent
  ],
  templateUrl: './onboarding-workshop-info-page.component.html',
  styleUrl: './onboarding-workshop-info-page.component.css'
})
export class OnboardingWorkshopInfoPageComponent {

}
