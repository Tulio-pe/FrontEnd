export interface WorkshopProfile {
  id: string
  name: string
  email: string
  phone: string
  description: string
  imageUrl?: string
  services: string[]
}

export interface WorkshopSchedule {
  id: string
  schedules: DaySchedule[]
}

export interface DaySchedule {
  day: string
  isOpen: boolean
  openTime: string
  closeTime: string
}

export interface UpdateProfileRequest {
  name: string
  email: string
  phone: string
  description: string
  services: string[]
  imageUrl?: string
}

export interface UpdateScheduleRequest {
  schedules: DaySchedule[]
}
