import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle.entity';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ViewCarComponent } from '../../ccomponents/view-car/view-car.component';
import { NgIf } from '@angular/common';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {SideNavegationBarComponent} from '../../../public/components/side-navegation-bar/side-navegation-bar.component';

@Component({
  selector: 'app-list-cars-page',
  templateUrl: './list-cars-page.component.html',
  styleUrls: ['./list-cars-page.component.css'],
  standalone: true,
  imports: [
    ViewCarComponent,
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SideNavegationBarComponent,
  ],
})
export class ListCarsPageComponent implements OnInit {
  vehicles: Vehicle[] = [];
  loading = false;
  error: string | null = null;

  showForm = false;
  vehicleForm!: FormGroup;
  /**
   * Constructor injecting required services
   * @param vehicleService Service to interact with backend vehicle API
   * @param fb FormBuilder to create reactive forms
   */
  constructor(private vehicleService: VehicleService, private fb: FormBuilder) {}

  ngOnInit() {
    this.loadVehicles();
    this.initForm();
  }

  /**
   * Fetches the list of vehicles from the backend API
   * Handles loading state and errors
   */
  loadVehicles() {
    this.loading = true;
    this.error = null;
    this.vehicleService.getAll().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }
  /**
   * Initializes the reactive form with validation rules for each field
   */
  initForm() {
    this.vehicleForm = this.fb.group({
      vehicleId: [0, [Validators.required, Validators.min(1)]],
      license_plate: ['', [Validators.required, Validators.pattern(/^[A-Z0-9-]{5,8}$/i)]],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: [
        new Date().getFullYear(),
        [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear() + 1)],
      ],
      fuel_type: ['', Validators.required],
    });
  }
  /**
   * Toggles the visibility of the vehicle creation form
   */
  toggleForm() {
    this.showForm = !this.showForm;
  }
  /**
   * Handles the submission of the vehicle creation form
   * Validates the form, creates a new Vehicle instance, and calls the backend service to save it
   * On success, adds the new vehicle to the list and resets the form
   * On error, sets the error message for display
   */
  onSubmit() {
    if (this.vehicleForm.invalid) return;

    const formValue = this.vehicleForm.value;
    const newVehicle = new Vehicle(
      formValue.vehicleId,
      formValue.license_plate,
      formValue.brand,
      formValue.model,
      formValue.year,
      formValue.fuel_type
    );

    this.vehicleService.create(newVehicle).subscribe({
      next: (vehicle) => {
        this.vehicles.push(vehicle);
        this.vehicleForm.reset({
          vehicleId: 0,
          license_plate: '',
          brand: '',
          model: '',
          year: new Date().getFullYear(),
          fuel_type: '',
        });
        this.showForm = false;
      },
      error: (err) => {
        this.error = err.message;
      },
    });
  }
}
