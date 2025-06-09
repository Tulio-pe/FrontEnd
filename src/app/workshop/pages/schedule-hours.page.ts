import { Component } from '@angular/core';
import { ScheduleHoursComponent } from '../components/schedule-hours/schedule-hours.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-schedule-hours-page',
  standalone: true,
  imports: [ScheduleHoursComponent, RouterModule],
  template: '<app-schedule-hours></app-schedule-hours>',
  styles: []
})
export class ScheduleHoursPage {}
