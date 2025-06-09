import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Vehicle } from '../../models/vehicle.entity';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { NgForOf } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-view-car',
  standalone: true,
  imports: [
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatCardActions,
    NgForOf,
    MatButton,
  ],
  templateUrl: './view-car.component.html',
  styleUrls: ['./view-car.component.css'],
})
export class ViewCarComponent {
  @Input() vehicles: Vehicle[] = [];
  @Output() startRepair = new EventEmitter<Vehicle>();

  onStartRepair(vehicle: Vehicle) {
    this.startRepair.emit(vehicle);
  }
}
