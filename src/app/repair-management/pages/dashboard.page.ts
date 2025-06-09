import { Component } from '@angular/core';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [DashboardComponent, RouterModule],
  template: '<app-dashboard></app-dashboard>',
  styles: []
})
export class DashboardPage {}
