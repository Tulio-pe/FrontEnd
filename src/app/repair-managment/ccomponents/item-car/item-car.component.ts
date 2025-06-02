import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RepairOrder, VALID_STATUSES, StatusType } from '../../models/repairorder.entity';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import {NgForOf, NgIf} from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-item-auto',
  standalone: true,
  imports: [
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatCardActions,
    NgIf,
    MatButton,
    MatMenuModule,
    NgForOf
  ],
  templateUrl:'item-car.component.html',
  styleUrls: ['./item-car.component.css']
})
export class ItemAutoComponent {
  @Input() repairOrder!: RepairOrder;
  @Output() toggleEstado = new EventEmitter<RepairOrder>();
  @Input() mostrarBoton: boolean = true;

  estados = VALID_STATUSES;

  seleccionarEstado(nuevoEstado: StatusType): void {
    if (nuevoEstado !== this.repairOrder.status) {
      this.repairOrder.status = nuevoEstado;
      this.toggleEstado.emit(this.repairOrder);
    }
  }
}
