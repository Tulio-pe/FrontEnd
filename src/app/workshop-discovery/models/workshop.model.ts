export interface Workshop {
  id: string
  name: string
  companyName: string
  description: string
  imageUrl: string
  region: string
  province: string
  district: string
  specialties: string[]
  rating: number
  reviewCount: number
  address: string
  phone: string
  email: string
  website?: string
  schedule: WorkshopSchedule[]
  services: WorkshopService[]
  isOpen: boolean
}

export interface WorkshopSchedule {
  day: string
  openTime: string
  closeTime: string
  isOpen: boolean
}

export interface WorkshopService {
  name: string
  description: string
  estimatedTime: string
  price: string
}

export interface WorkshopFilters {
  region: string
  province: string
  district: string
  specialty: string
}

export interface FilterOption {
  value: string
  label: string
}
