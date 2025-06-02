import { Component, OnInit } from '@angular/core';
import { RepairOrder, VALID_STATUSES, StatusType } from '../../models/repairorder.entity';
import { RepairService } from '../../services/repair.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ItemAutoComponent } from '../../ccomponents/item-car/item-car.component';
import { NgIf, NgForOf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {VehicleService} from '../../services/vehicle.service';
import {SideNavegationBarComponent} from '../../../public/components/side-navegation-bar/side-navegation-bar.component';

@Component({
  selector: 'app-dashboard-work-shop-page',
  templateUrl: './dashboard-work-shop-page.component.html',
  styleUrls: ['./dashboard-work-shop-page.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    NgIf,
    NgForOf,
    ItemAutoComponent,
    MatOption,
    MatSelect,
    SideNavegationBarComponent,
  ],
})
export class DashboardWorkShopPageComponent implements OnInit {
  repairOrders: RepairOrder[] = [];
  filteredOrders: RepairOrder[] = [];
  filterStatus: StatusType | 'all' = 'all';
  loading = false;
  error: string | null = null;

  showForm = false;
  repairForm!: FormGroup;

  VALID_STATUSES = VALID_STATUSES;

  constructor(private repairService: RepairService, private fb: FormBuilder,private vehicleService:VehicleService) {}

  ngOnInit() {
    this.loadRepairOrders();
    this.initForm();
  }

  loadRepairOrders() {
    this.loading = true;
    this.error = null;
    this.repairService.getAll().subscribe({
      next: (orders) => {
        this.repairOrders = orders;
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  initForm() {
    this.repairForm = this.fb.group({
      license_plate: ['', [Validators.required, Validators.pattern(/^[A-Z0-9-]{5,8}$/i)]],
      details: ['', Validators.required],
      workshopAssigned: ['', Validators.required],
      status: ['Por revisar', Validators.required],
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  applyFilter() {
    if (this.filterStatus === 'all') {
      this.filteredOrders = [...this.repairOrders];
    } else {
      this.filteredOrders = this.repairOrders.filter(ro => ro.status === this.filterStatus);
    }
  }

  onFilterChange(status: StatusType | 'all') {
    this.filterStatus = status;
    this.applyFilter();
  }

  onSubmit() {
    if (this.repairForm.invalid) return;

    const formValue = this.repairForm.value;

    this.vehicleService.getByLicensePlate(formValue.license_plate).subscribe({
      next: (vehicles) => {
        if (vehicles.length === 0) {
          this.error = 'No se puede crear reparación: vehículo no registrado.';
          return;
        }

        const vehicle = vehicles[0]; // vehículo completo desde backend

        const newId = Date.now().toString();

        const newRepair = new RepairOrder(
          newId,
          formValue.status,
          formValue.details,
          formValue.workshopAssigned,
          vehicle
        );

        this.repairService.create(newRepair).subscribe({
          next: (order) => {
            this.repairOrders.push(order);
            this.applyFilter();
            this.repairForm.reset({ status: 'Por revisar' });
            this.showForm = false;
            this.error = null;
          },
          error: (err) => {
            this.error = err.message;
          }
        });
      },
      error: (err) => {
        this.error = 'Error verificando vehículo: ' + err.message;
      }
    });
  }


  onStatusToggle(updatedOrder: RepairOrder) {
    this.repairService.update(updatedOrder).subscribe({
      next: () => {
        this.applyFilter();
      },
      error: (err) => {
        this.error = err.message;
      }
    });
  }
}
