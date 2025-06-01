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
  }

  onSubmit(): void {
    if (this.workshopForm.invalid) {
      return;
    }
    
    this.isSubmitting = true;
    this.errorMessage = null;
    
    const workshopData = {
      ...this.workshopForm.value,
      services: this.selectedServices
    };
    
    // Aquí implementarías la lógica para guardar la información del taller
    // Esto podría incluir una llamada a una API a través de un servicio
    
    // Por ahora, simplemente simularemos una respuesta exitosa
    setTimeout(() => {
      this.isSubmitting = false;
      this.router.navigate(['/home']);
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
