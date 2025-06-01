import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  workshopInfo: any = null;
  workshopSchedule: any = null;
  userData: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Get workshop data from localStorage (simulating API calls)
    this.loadWorkshopData();
    
    // Subscribe to user data from auth service
    this.authService.currentUser$.subscribe(user => {
      this.userData = user;
    });
  }

  loadWorkshopData(): void {
    const scheduleData = localStorage.getItem('workshopSchedule');
    if (scheduleData) {
      this.workshopSchedule = JSON.parse(scheduleData);
    }
    
    const workshopData = localStorage.getItem('workshopInfo');
    if (workshopData) {
      this.workshopInfo = JSON.parse(workshopData);
    }
  }

  logout(): void {
    this.authService.logout();
    // Navigate away is handled by the guard
  }
}
