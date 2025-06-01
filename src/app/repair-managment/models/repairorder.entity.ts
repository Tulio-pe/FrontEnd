export const VALID_STATUSES = ['Por revisar', 'En revisión', 'Revisado', 'Entregado'] as const;
export type StatusType = typeof VALID_STATUSES[number];

import { Vehicle } from './vehicle.entity';

export class RepairOrder {
  private _id: string;
  private _status!: StatusType;  // <-- operador !

  private _details: string;
  private _workshopAssigned: string;
  private _vehicle: Vehicle;

  constructor(
    id: string,
    status: StatusType,
    details: string,
    workshopAssigned: string,
    vehicle: Vehicle
  ) {
    this._id = id;
    this.status = status; // setter
    this._details = details;
    this._workshopAssigned = workshopAssigned;
    this._vehicle = vehicle;
  }

  public get id(): string { return this._id; }
  public get status(): StatusType { return this._status; }
  public get details(): string { return this._details; }
  public get workshopAssigned(): string { return this._workshopAssigned; }
  public get vehicle(): Vehicle { return this._vehicle; }
  public get vehicle_plate(): string {
    return this._vehicle.license_plate;
  }
  public get model():string { return this._vehicle.model; }

  public set status(value: StatusType) {
    if (!VALID_STATUSES.includes(value)) {
      throw new Error(`Estado inválido: ${value}`);
    }
    this._status = value;
  }

  public set details(value: string) { this._details = value; }
  public set workshopAssigned(value: string) { this._workshopAssigned = value; }
}
