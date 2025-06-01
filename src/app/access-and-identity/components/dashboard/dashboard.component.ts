import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface RepairService {
  name: string;
}

interface Repair {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: string;
  services: string[];
  status: 'porRevisar' | 'enRevision' | 'revisado' | 'entregado';
}

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
  
  repairs: Repair[] = [];
  filteredRepairs: Repair[] = [];
  currentFilter: 'porRevisar' | 'enRevision' | 'revisado' | 'entregado' = 'porRevisar';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Get workshop data from localStorage (simulating API calls)
    this.loadWorkshopData();
    
    // Subscribe to user data from auth service
    this.authService.currentUser$.subscribe(user => {
      this.userData = user;
    });
    
    // Load mock repair data
    this.loadMockRepairs();
    this.filterRepairs('porRevisar');
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
  
  loadMockRepairs(): void {
    this.repairs = [
      {
        id: '1',
        plate: 'ABC-123',
        brand: 'Toyota',
        model: 'Corolla',
        year: '2020',
        services: ['Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'],
        status: 'porRevisar'
      },
      {
        id: '2',
        plate: 'XYZ-789',
        brand: 'Honda',
        model: 'Civic',
        year: '2021',
        services: ['Lorem ipsum', 'Lorem ipsum'],
        status: 'enRevision'
      },
      {
        id: '3',
        plate: 'DEF-456',
        brand: 'Nissan',
        model: 'Sentra',
        year: '2019',
        services: ['Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'],
        status: 'revisado'
      },
      {
        id: '4',
        plate: 'GHI-789',
        brand: 'Ford',
        model: 'Mustang',
        year: '2022',
        services: ['Lorem ipsum'],
        status: 'entregado'
      }
    ];
  }
  
  filterRepairs(status: 'porRevisar' | 'enRevision' | 'revisado' | 'entregado'): void {
    this.currentFilter = status;
    this.filteredRepairs = this.repairs.filter(repair => repair.status === status);
  }
  
  changeStatus(repair: Repair): void {
    // Simple status rotation logic
    const statuses: ('porRevisar' | 'enRevision' | 'revisado' | 'entregado')[] = [
      'porRevisar', 'enRevision', 'revisado', 'entregado'
    ];
    
    const currentIndex = statuses.indexOf(repair.status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    repair.status = statuses[nextIndex];
    
    // Re-apply filter to update view
    this.filterRepairs(this.currentFilter);
  }
  
  createNewRepair(): void {
    // Here you would typically navigate to a form or open a modal
    console.log('Creating new repair...');
    alert('Función para crear nueva reparación');
  }

  logout(): void {
    this.authService.logout();
    // Navigate away is handled by the guard
  }
}
