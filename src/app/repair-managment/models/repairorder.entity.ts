export const VALID_STATUSES = ['Por revisar', 'En revisión', 'Revisado', 'Entregado'] as const;
export type StatusType = typeof VALID_STATUSES[number];

import { Vehicle } from './vehicle.entity';

export class RepairOrder {
  public id: string;
  private _status!: StatusType;
  public details: string;
  public workshopAssigned: string;
  public vehicle: Vehicle;

  constructor(
    id: string,
    status: StatusType,
    details: string,
    workshopAssigned: string,
    vehicle: Vehicle
  ) {
    this.id = id;
    this.status = status;  // usa el setter para validar
    this.details = details;
    this.workshopAssigned = workshopAssigned;
    this.vehicle = vehicle;
  }

  public get status(): StatusType {
    return this._status;
  }

  public set status(value: StatusType) {
    if (!VALID_STATUSES.includes(value)) {
      throw new Error(`Invalid status: ${value}`);
    }
    this._status = value;
  }
  public toJSON() {
    return {
      id: this.id,
      status: this._status,           // Aquí expones 'status' (no '_status')
      details: this.details,
      workshopAssigned: this.workshopAssigned,
      vehicle: this.vehicle
    };
  }
}
