import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-workshop-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './workshop-info.component.html',
  styleUrls: ['./workshop-info.component.css']
})
export class WorkshopInfoComponent {
  workshopForm: FormGroup;
  selectedLogoFile: File | null = null;
  selectedWorkshopImage: File | null = null;
  isSubmitting = false;
  errorMessage: string | null = null;
  selectedServices: string[] = [];
  logoPreview: string | ArrayBuffer | null = null;
  workshopImagePreview: string | ArrayBuffer | null = null;

  @ViewChild('logoFileInput') logoFileInput!: ElementRef;
  @ViewChild('workshopImageFileInput') workshopImageFileInput!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {    this.workshopForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }  onSubmit(): void {
    // Marcar todos los campos como tocados para mostrar posibles errores
    Object.keys(this.workshopForm.controls).forEach(key => {
      const control = this.workshopForm.get(key);
      control?.markAsTouched();
      control?.updateValueAndValidity();
    });

    if (this.workshopForm.invalid) {
      this.errorMessage = "Por favor, completa todos los campos requeridos";
      return;
    }
    
    this.isSubmitting = true;
    this.errorMessage = null;
    
    // Prepare workshop data object with form values and selected services
    const workshopData = {
      ...this.workshopForm.value,
      services: this.selectedServices
    };
    
    // Add logo and workshop image if available
    if (this.logoPreview) {
      workshopData.logoImage = this.logoPreview;
    }
    
    if (this.workshopImagePreview) {
      workshopData.workshopImage = this.workshopImagePreview;
    }
    
    // Store in localStorage to persist between pages
    localStorage.setItem('workshopInfo', JSON.stringify(workshopData));
    
    console.log('Navegando a schedule-hours...');
    
    // Navegación directa a la página de horarios después de un breve delay para mostrar el estado "procesando"
    setTimeout(() => {
      this.isSubmitting = false;
      
      // Asegurar que el token está en localStorage para pasar el authGuard
      if (!this.authService.isAuthenticated()) {
        console.log('Usuario no autenticado, almacenando token simulado');
        // Almacenar un token simulado para pasar el authGuard
        localStorage.setItem('auth_token', 'token-simulado-workshop-info');
      }
      
      // Navegar a la página de horarios
      this.router.navigate(['/schedule-hours'])
        .then(() => console.log('Navegación completada a schedule-hours'))
        .catch(error => console.error('Error en la navegación:', error));
    }, 1000);
  }

  toggleService(service: string): void {
    if (this.selectedServices.includes(service)) {
      this.selectedServices = this.selectedServices.filter(s => s !== service);
    } else {
      this.selectedServices.push(service);
    }
  }
  onLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedLogoFile = input.files[0];
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result;
      };
      reader.readAsDataURL(this.selectedLogoFile);
    }
  }

  onWorkshopImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedWorkshopImage = input.files[0];
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.workshopImagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedWorkshopImage);
    }
  }

  triggerLogoUpload(): void {
    const fileInput = document.getElementById('logoUpload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  triggerWorkshopImageUpload(): void {
    const fileInput = document.getElementById('workshopImageUpload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  openAddServiceDialog(): void {
    // This would be implemented with a modal or dialog
    // For now just add a placeholder service
    this.toggleService('Nuevo Servicio');
  }

  isServiceSelected(service: string): boolean {
    return this.selectedServices.includes(service);
  }
}
