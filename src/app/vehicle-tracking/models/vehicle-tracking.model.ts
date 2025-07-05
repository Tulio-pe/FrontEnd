/**
 * Vehicle tracking models for customer-facing repair status tracking.
 */
export interface VehicleTracking {
  id: string
  trackingCode: string
  vehicleInfo: VehicleInfo
  currentStatus: TrackingStatus
  services: TrackingService[]
  statusHistory: StatusUpdate[]
  estimatedCompletion: string
  workshopInfo: WorkshopInfo
}

export interface VehicleInfo {
  licensePlate: string
  brand: string
  model: string
  year: number
  color: string
  vin?: string
}

export interface TrackingStatus {
  currentStage: string
  progress: number
  description: string
  lastUpdated: string
}

export interface TrackingService {
  id: string
  name: string
  status: "pending" | "in-progress" | "completed"
  estimatedTime: string
  actualTime?: string
}

export interface StatusUpdate {
  id: string
  stage: string
  title: string
  description: string
  timestamp: string
  imageUrl?: string
  completed: boolean
}

export interface WorkshopInfo {
  name: string
  phone: string
  email: string
  address: string
}

export interface TrackingCodeRequest {
  code: string
}
