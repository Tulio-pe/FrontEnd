import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RepairOrder } from '../../models/repairorder.entity';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { NgForOf} from '@angular/common';
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
    MatButton
  ],
  templateUrl: './view-car.component.html',
  styleUrls: ['./view-car.component.css']
})
export class ViewCarComponent {
  @Input() repairOrders: RepairOrder[] = [];
  @Output() startRepair = new EventEmitter<RepairOrder>();

  onStartRepair(order: RepairOrder) {
    this.startRepair.emit(order);
  }
}
