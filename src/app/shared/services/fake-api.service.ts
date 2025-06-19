import { Injectable } from "@angular/core"
import { type Observable, of, delay, BehaviorSubject } from "rxjs"
import  { WorkshopProfile, WorkshopSchedule } from "../../repair-management/models"
import  { Workshop } from "../../workshop-discovery"

@Injectable({
  providedIn: "root",
})
export class FakeApiService {
  private profileSubject = new BehaviorSubject<WorkshopProfile>({
    id: "1",
    name: "Mi Taller",
    email: "contacto@mitaller.com",
    phone: "+51 999 888 777",
    description: "Descripción de mi taller",
    services: ["Mecánica General", "Cambio de Aceite"],
    imageUrl: "/assets/img/taller1.png",
  })

  private scheduleSubject = new BehaviorSubject<WorkshopSchedule>({
    id: "1",
    schedules: [
      { day: "MONDAY", isOpen: true, openTime: "08:00", closeTime: "18:00" },
      { day: "TUESDAY", isOpen: true, openTime: "08:00", closeTime: "18:00" },
      { day: "WEDNESDAY", isOpen: true, openTime: "08:00", closeTime: "18:00" },
      { day: "THURSDAY", isOpen: true, openTime: "08:00", closeTime: "18:00" },
      { day: "FRIDAY", isOpen: true, openTime: "08:00", closeTime: "18:00" },
      { day: "SATURDAY", isOpen: true, openTime: "09:00", closeTime: "14:00" },
      { day: "SUNDAY", isOpen: false, openTime: "", closeTime: "" },
    ],
  })

  private workshopsSubject = new BehaviorSubject<Workshop[]>([
    {
      id: "1",
      name: "Taller Mecánico Express",
      companyName: "Taller Mecánico Express",
      description: "Especialistas en reparación y mantenimiento automotriz",
      imageUrl: "/assets/img/taller1.png",
      region: "lima",
      province: "lima",
      district: "miraflores",
      specialties: ["mecanica", "electricidad", "pintura"],
      rating: 4.5,
      reviewCount: 128,
      address: "Av. Larco 123, Miraflores",
      phone: "+51 999 888 777",
      email: "contacto@tallerexpress.com",
      schedule: [
        { day: "Lunes", openTime: "08:00", closeTime: "18:00", isOpen: true },
        { day: "Martes", openTime: "08:00", closeTime: "18:00", isOpen: true },
        { day: "Miércoles", openTime: "08:00", closeTime: "18:00", isOpen: true },
        { day: "Jueves", openTime: "08:00", closeTime: "18:00", isOpen: true },
        { day: "Viernes", openTime: "08:00", closeTime: "18:00", isOpen: true },
        { day: "Sábado", openTime: "08:00", closeTime: "14:00", isOpen: true },
        { day: "Domingo", openTime: "", closeTime: "", isOpen: false },
      ],
      services: [
        {
          name: "Cambio de aceite",
          description: "Cambio completo de aceite y filtro",
          estimatedTime: "30 min",
          price: "S/. 80",
        },
        {
          name: "Revisión general",
          description: "Diagnóstico completo del vehículo",
          estimatedTime: "2 horas",
          price: "S/. 150",
        },
      ],
      isOpen: true,
    },
  ])

  private availableServices = [
    "Mecánica General",
    "Cambio de Aceite",
    "Frenos",
    "Suspensión",
    "Electricidad Automotriz",
    "Aire Acondicionado",
    "Pintura",
    "Planchado",
    "Diagnóstico Computarizado",
  ]

  // Profile API methods
  getProfile(): Observable<WorkshopProfile> {
    console.log("FakeAPI: Getting profile", this.profileSubject.value)
    return this.profileSubject.asObservable().pipe(delay(500))
  }

  updateProfile(profile: WorkshopProfile): Observable<WorkshopProfile> {
    console.log("FakeAPI: Updating profile", profile)
    this.profileSubject.next(profile)
    return of(profile).pipe(delay(800))
  }

  // Schedule API methods
  getSchedule(): Observable<WorkshopSchedule> {
    console.log("FakeAPI: Getting schedule", this.scheduleSubject.value)
    return this.scheduleSubject.asObservable().pipe(delay(500))
  }

  updateSchedule(schedule: WorkshopSchedule): Observable<WorkshopSchedule> {
    console.log("FakeAPI: Updating schedule", schedule)
    this.scheduleSubject.next(schedule)
    return of(schedule).pipe(delay(800))
  }

  // Workshop API methods
  getWorkshops(): Observable<Workshop[]> {
    console.log("FakeAPI: Getting workshops", this.workshopsSubject.value)
    return this.workshopsSubject.asObservable().pipe(delay(500))
  }

  createWorkshop(workshop: Workshop): Observable<Workshop> {
    console.log("FakeAPI: Creating workshop", workshop)
    const currentWorkshops = this.workshopsSubject.value
    const existingIndex = currentWorkshops.findIndex((w) => w.id === workshop.id)

    if (existingIndex >= 0) {
      // Update existing workshop
      console.log("FakeAPI: Updating existing workshop at index", existingIndex)
      currentWorkshops[existingIndex] = workshop
    } else {
      // Add new workshop
      console.log("FakeAPI: Adding new workshop")
      currentWorkshops.push(workshop)
    }

    console.log("FakeAPI: Updated workshops list", currentWorkshops)
    this.workshopsSubject.next([...currentWorkshops])
    return of(workshop).pipe(delay(800))
  }

  getWorkshopById(id: string): Observable<Workshop | null> {
    const workshop = this.workshopsSubject.value.find((w) => w.id === id) || null
    console.log("FakeAPI: Getting workshop by id", id, workshop)
    return of(workshop).pipe(delay(300))
  }

  // Available services
  getAvailableServices(): string[] {
    return [...this.availableServices]
  }

  // Current data getters (for immediate access)
  getCurrentProfile(): WorkshopProfile {
    return this.profileSubject.value
  }

  getCurrentSchedule(): WorkshopSchedule {
    return this.scheduleSubject.value
  }

  getCurrentWorkshops(): Workshop[] {
    return this.workshopsSubject.value
  }
}
