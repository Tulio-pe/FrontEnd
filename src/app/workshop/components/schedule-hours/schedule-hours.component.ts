import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../access-and-identity/services/auth.service';

interface Day {
  name: string;
  nameLang: string;
  enabled: boolean;
  morningStart: string;
  morningEnd: string;
  afternoonStart: string;
  afternoonEnd: string;
  workingAllDay: boolean;
}

// Add interfaces for type safety
interface ScheduleHours {
  [key: string]: {
    active: boolean;
    allDay?: boolean;
    hours?: Array<{start: string, end: string}>;
  };
}

interface ScheduleResponse {
  success: boolean;
  message: string;
  data?: any;
}

@Component({
  selector: 'app-schedule-hours',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './schedule-hours.component.html',
  styleUrls: ['./schedule-hours.component.css']
})
export class ScheduleHoursComponent implements OnInit {
  scheduleForm: FormGroup;
  days: Day[] = [
    { name: 'monday', nameLang: 'Lunes', enabled: false, morningStart: '09:00', morningEnd: '13:00', afternoonStart: '15:00', afternoonEnd: '19:00', workingAllDay: true },
    { name: 'tuesday', nameLang: 'Martes', enabled: false, morningStart: '09:00', morningEnd: '13:00', afternoonStart: '15:00', afternoonEnd: '19:00', workingAllDay: true },
    { name: 'wednesday', nameLang: 'Miércoles', enabled: false, morningStart: '09:00', morningEnd: '13:00', afternoonStart: '15:00', afternoonEnd: '19:00', workingAllDay: true },
    { name: 'thursday', nameLang: 'Jueves', enabled: false, morningStart: '09:00', morningEnd: '13:00', afternoonStart: '15:00', afternoonEnd: '19:00', workingAllDay: true },
    { name: 'friday', nameLang: 'Viernes', enabled: false, morningStart: '09:00', morningEnd: '13:00', afternoonStart: '15:00', afternoonEnd: '19:00', workingAllDay: true },
    { name: 'saturday', nameLang: 'Sábado', enabled: false, morningStart: '09:00', morningEnd: '13:00', afternoonStart: '15:00', afternoonEnd: '19:00', workingAllDay: true },
    { name: 'sunday', nameLang: 'Domingo', enabled: false, morningStart: '09:00', morningEnd: '13:00', afternoonStart: '15:00', afternoonEnd: '19:00', workingAllDay: true }
  ];
  isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.scheduleForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    // Initialize with default values for working days (Monday-Friday)
    this.days[0].enabled = true; // Monday
    this.days[1].enabled = true; // Tuesday
    this.days[2].enabled = true; // Wednesday
    this.days[3].enabled = true; // Thursday
    this.days[4].enabled = true; // Friday
  }

  toggleDay(day: Day): void {
    day.enabled = !day.enabled;
  }

  toggleAllDay(day: Day): void {
    day.workingAllDay = !day.workingAllDay;
  }

  onSubmit(): void {
    if (this.days.filter(day => day.enabled).length === 0) {
      alert('Por favor, selecciona al menos un día de atención');
      return;
    }

    this.isSubmitting = true;

    // Prepare data to send to API with proper typing
    const scheduleData: ScheduleHours = this.days.reduce((obj, day) => {
      if (day.enabled) {
        obj[day.name] = {
          active: true,
          allDay: day.workingAllDay,
          hours: day.workingAllDay
            ? [{start: day.morningStart, end: day.afternoonEnd}]
            : [{start: day.morningStart, end: day.morningEnd}, {start: day.afternoonStart, end: day.afternoonEnd}]
        };
      } else {
        obj[day.name] = { active: false };
      }
      return obj;
    }, {} as ScheduleHours);

    // Add this to local storage to simulate storing in the backend
    localStorage.setItem('workshopSchedule', JSON.stringify(scheduleData));

    console.log('Schedule data to save:', scheduleData);

    // Call the auth service with proper type annotations
    this.authService.saveScheduleHours(scheduleData).subscribe({
      next: (response: ScheduleResponse) => {
        console.log('Schedule saved successfully', response);
        this.isSubmitting = false;
        // Redirect to dashboard after successful save
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        console.error('Error saving schedule', error);
        this.isSubmitting = false;
        alert('Hubo un error al guardar el horario. Por favor, intenta de nuevo.');
      }
    });
  }
}
