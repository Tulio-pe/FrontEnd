/**
 * Repair management interfaces and types.
 */
export interface Repair {
  id: string
  plateNumber: string
  vehicleInfo: VehicleInfo
  services: RepairService[]
  status: RepairStatus
  createdAt: string
  updatedAt: string
  estimatedCompletion?: string
}

export interface VehicleInfo {
  brand: string
  model: string
  year: number
  color: string
  vin?: string
}

export interface RepairService {
  id: string
  name: string
  description: string
  estimatedTime: string
  price: number
  status: "pending" | "in-progress" | "completed"
}

export type RepairStatus = "por-revisar" | "en-revision" | "revisado" | "entregado"

export interface CreateRepairRequest {
  plateNumber: string
  vehicleInfo: VehicleInfo
  services: string[]
}
