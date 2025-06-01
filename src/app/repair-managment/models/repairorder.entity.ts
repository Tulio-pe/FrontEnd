export class RepairOrder {
  private _id: string;
  private _status: string;
  private _details: string;
  private _workshopAssigned: string;

  constructor(id: string, status: string, details: string, workshopAssigned: string) {
    this._id = id;
    this._status = status;
    this._details = details;
    this._workshopAssigned = workshopAssigned;
  }

  public get id(): string { return this._id; }
  public get status(): string { return this._status; }
  public get details(): string { return this._details; }
  public get workshopAssigned(): string { return this._workshopAssigned; }
}
