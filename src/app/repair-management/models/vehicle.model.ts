export interface Vehicle {
  id: string
  plateNumber: string
  brand: string
  model: string
  year: number
  color: string
  vin?: string
  createdAt: string
  isInRepair: boolean
}

export interface CreateVehicleRequest {
  plateNumber: string
  brand: string
  model: string
  year: number
  color: string
  vin?: string
}
