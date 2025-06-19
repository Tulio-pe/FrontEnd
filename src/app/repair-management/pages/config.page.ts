import { Component,  OnInit, inject, ViewChild,  ElementRef } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatTabsModule } from "@angular/material/tabs"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSlideToggleModule } from "@angular/material/slide-toggle"
import { MatChipsModule } from "@angular/material/chips"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar"
import { FormBuilder,  FormGroup, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms"
import { WorkshopConfigService } from "../services/workshop-config.service"
import { WorkshopDiscoveryService } from "../../workshop-discovery/services/workshop-discovery.service"
import { I18nService } from "../../shared/services/i18n.service"
import  { WorkshopProfile, WorkshopSchedule, DaySchedule } from "../models"
import  { Workshop } from "../../workshop-discovery/models"

@Component({
  selector: "app-config",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: "./config.page.html",
  styleUrls: ["./config.page.css"],
})
export class ConfigPage implements OnInit {
  @ViewChild("fileInput") fileInput!: ElementRef<HTMLInputElement>

  private fb = inject(FormBuilder)
  private configService = inject(WorkshopConfigService)
  private workshopDiscoveryService = inject(WorkshopDiscoveryService)
  private i18nService = inject(I18nService)
  private snackBar = inject(MatSnackBar)

  // Simple data properties instead of complex FormArrays
  profileData: WorkshopProfile = {
    id: "workshop-" + Date.now(),
    name: "",
    email: "",
    phone: "",
    description: "",
    services: [],
    imageUrl: "/assets/img/taller1.png",
  }

  scheduleData: WorkshopSchedule = {
    id: "workshop-" + Date.now(),
    schedules: [
      { day: "MONDAY", isOpen: true, openTime: "08:00", closeTime: "18:00" },
      { day: "TUESDAY", isOpen: true, openTime: "08:00", closeTime: "18:00" },
      { day: "WEDNESDAY", isOpen: true, openTime: "08:00", closeTime: "18:00" },
      { day: "THURSDAY", isOpen: true, openTime: "08:00", closeTime: "18:00" },
      { day: "FRIDAY", isOpen: true, openTime: "08:00", closeTime: "18:00" },
      { day: "SATURDAY", isOpen: true, openTime: "09:00", closeTime: "14:00" },
      { day: "SUNDAY", isOpen: false, openTime: "", closeTime: "" },
    ],
  }

  profileForm!: FormGroup
  availableServices: string[] = []
  newService = ""
  isSubmittingProfile = false
  isSubmittingSchedule = false
  isLoaded = false
  selectedImageFile: File | null = null
  imagePreview: string | null = null
  profileCompleted = false

  constructor() {
    this.initializeProfileForm()
  }

  ngOnInit() {
    this.availableServices = this.configService.getAvailableServices()
    this.loadData()
  }

  private initializeProfileForm() {
    this.profileForm = this.fb.group({
      name: [this.profileData.name, Validators.required],
      email: [this.profileData.email, [Validators.required, Validators.email]],
      phone: [this.profileData.phone, Validators.required],
      description: [this.profileData.description, Validators.required],
    })
  }

  private loadData() {
    console.log("ConfigPage: Loading data...")

    // Load profile data
    this.configService.getProfile().subscribe((profile) => {
      console.log("ConfigPage: Profile loaded", profile)
      if (profile) {
        this.profileData = { ...profile }
        this.imagePreview = profile.imageUrl || "/assets/img/taller1.png"
        this.profileForm.patchValue({
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          description: profile.description,
        })

        // Check if profile is completed
        this.profileCompleted = !!(profile.name && profile.email && profile.phone && profile.description)
        console.log("ConfigPage: Profile completed?", this.profileCompleted)
        this.isLoaded = true
      }
    })

    // Load schedule data
    this.configService.getSchedule().subscribe((schedule) => {
      console.log("ConfigPage: Schedule loaded", schedule)
      if (schedule && schedule.schedules) {
        this.scheduleData = { ...schedule }
      }
    })
  }

  // Image upload methods
  onImageClick() {
    this.fileInput.nativeElement.click()
  }

  onImageSelected(event: Event) {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        this.snackBar.open("Por favor selecciona un archivo de imagen válido", "Cerrar", {
          duration: 3000,
        })
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.snackBar.open("La imagen debe ser menor a 5MB", "Cerrar", {
          duration: 3000,
        })
        return
      }

      this.selectedImageFile = file

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  private async uploadImage(): Promise<string> {
    if (!this.selectedImageFile) {
      return this.profileData.imageUrl || "/assets/img/taller1.png"
    }

    // Convert to base64 for storage (in a real app, you'd upload to a server)
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        resolve(e.target?.result as string)
      }
      reader.readAsDataURL(this.selectedImageFile!)
    })
  }

  // Service management methods
  addService() {
    if (this.newService.trim() && !this.profileData.services.includes(this.newService.trim())) {
      this.profileData.services.push(this.newService.trim())
      this.newService = ""
    }
  }

  removeService(index: number) {
    this.profileData.services.splice(index, 1)
  }

  addPredefinedService(service: string) {
    if (!this.profileData.services.includes(service)) {
      this.profileData.services.push(service)
    }
  }

  // Schedule management methods
  toggleDay(daySchedule: DaySchedule) {
    daySchedule.isOpen = !daySchedule.isOpen
    if (!daySchedule.isOpen) {
      daySchedule.openTime = ""
      daySchedule.closeTime = ""
    } else {
      daySchedule.openTime = "08:00"
      daySchedule.closeTime = "18:00"
    }
  }

  updateScheduleTime(daySchedule: DaySchedule, field: "openTime" | "closeTime", event: Event) {
    const target = event.target as HTMLInputElement
    if (target) {
      daySchedule[field] = target.value
    }
  }

  private convertScheduleToWorkshopFormat() {
    const dayMap: { [key: string]: string } = {
      MONDAY: "Lunes",
      TUESDAY: "Martes",
      WEDNESDAY: "Miércoles",
      THURSDAY: "Jueves",
      FRIDAY: "Viernes",
      SATURDAY: "Sábado",
      SUNDAY: "Domingo",
    }

    return this.scheduleData.schedules.map((schedule) => ({
      day: dayMap[schedule.day] || schedule.day,
      openTime: schedule.openTime,
      closeTime: schedule.closeTime,
      isOpen: schedule.isOpen,
    }))
  }

  private async createWorkshopEntry(): Promise<Workshop> {
    console.log("ConfigPage: Creating workshop entry...")

    // Get the CURRENT profile data (the one that was just saved)
    const currentProfile = this.profileData // Use the local data instead of service
    const imageUrl = await this.uploadImage()

    console.log("ConfigPage: Current profile for workshop", currentProfile)

    const workshop: Workshop = {
      id: currentProfile.id,
      name: currentProfile.name,
      companyName: currentProfile.name,
      description: currentProfile.description,
      imageUrl: imageUrl,
      region: "lima", // Default values - you might want to add these to the form
      province: "lima",
      district: "miraflores",
      specialties: currentProfile.services.map((service) => service.toLowerCase().replace(/\s+/g, "-")),
      rating: 5.0,
      reviewCount: 0,
      address: `${currentProfile.name} - Dirección del taller`, // You might want to add this to the form
      phone: currentProfile.phone,
      email: currentProfile.email,
      website: "", // Optional
      schedule: this.convertScheduleToWorkshopFormat(),
      services: currentProfile.services.map((service) => ({
        name: service,
        description: `Servicio de ${service}`,
        estimatedTime: "1 hora",
        price: "S/. 100",
      })),
      isOpen: true,
    }

    console.log("ConfigPage: Workshop entry created", workshop)
    return workshop
  }

  async saveProfile() {
    console.log("ConfigPage: Saving profile...")

    if (this.profileForm.valid) {
      this.isSubmittingProfile = true

      try {
        // Upload image if selected
        const imageUrl = await this.uploadImage()

        const profileToSave: WorkshopProfile = {
          id: this.profileData.id,
          name: this.profileForm.value.name,
          email: this.profileForm.value.email,
          phone: this.profileForm.value.phone,
          description: this.profileForm.value.description,
          services: [...this.profileData.services],
          imageUrl: imageUrl,
        }

        console.log("ConfigPage: Profile to save", profileToSave)

        // Save profile
        this.configService.updateProfile(profileToSave).subscribe({
          next: (profile) => {
            console.log("ConfigPage: Profile saved successfully", profile)
            this.profileData = { ...profile }
            this.profileCompleted = true

            this.snackBar.open("Perfil guardado exitosamente. Ahora configura los horarios.", "Cerrar", {
              duration: 4000,
            })

            this.isSubmittingProfile = false
            this.selectedImageFile = null
          },
          error: (error) => {
            console.error("ConfigPage: Error saving profile", error)
            this.snackBar.open("Error al guardar el perfil", "Cerrar", {
              duration: 3000,
            })
            this.isSubmittingProfile = false
          },
        })
      } catch (error) {
        console.error("ConfigPage: Error uploading image", error)
        this.snackBar.open("Error al subir la imagen", "Cerrar", {
          duration: 3000,
        })
        this.isSubmittingProfile = false
      }
    }
  }

  async saveSchedule() {
    console.log("ConfigPage: Saving schedule...")

    if (!this.profileCompleted) {
      this.snackBar.open("Primero debes completar y guardar tu perfil", "Cerrar", {
        duration: 3000,
      })
      return
    }

    this.isSubmittingSchedule = true

    const scheduleToSave: WorkshopSchedule = {
      id: this.scheduleData.id,
      schedules: [...this.scheduleData.schedules],
    }

    console.log("ConfigPage: Schedule to save", scheduleToSave)

    this.configService.updateSchedule(scheduleToSave).subscribe({
      next: async (schedule) => {
        console.log("ConfigPage: Schedule saved successfully", schedule)
        this.scheduleData = { ...schedule }

        try {
          // Now create the workshop in /workshops
          console.log("ConfigPage: Creating workshop...")
          const workshop = await this.createWorkshopEntry()

          this.workshopDiscoveryService.createWorkshop(workshop).subscribe({
            next: (createdWorkshop: Workshop) => {
              console.log("ConfigPage: Workshop created successfully in /workshops", createdWorkshop)
              this.snackBar.open(
                "¡Perfecto! Tu taller ha sido creado y está disponible en la búsqueda de talleres.",
                "Cerrar",
                {
                  duration: 5000,
                },
              )
              this.isSubmittingSchedule = false
            },
            error: (error: any) => {
              console.error("ConfigPage: Error creating workshop", error)
              this.snackBar.open("Horarios guardados, pero hubo un error al crear el taller público", "Cerrar", {
                duration: 4000,
              })
              this.isSubmittingSchedule = false
            },
          })
        } catch (error) {
          console.error("ConfigPage: Error preparing workshop data", error)
          this.snackBar.open("Error al preparar los datos del taller", "Cerrar", {
            duration: 3000,
          })
          this.isSubmittingSchedule = false
        }
      },
      error: (error) => {
        console.error("ConfigPage: Error saving schedule", error)
        this.snackBar.open("Error al guardar los horarios", "Cerrar", {
          duration: 3000,
        })
        this.isSubmittingSchedule = false
      },
    })
  }

  translate(key: string): string {
    return this.i18nService.translate(key)
  }

  getDayName(day: string): string {
    const dayMap: { [key: string]: string } = {
      MONDAY: "Lunes",
      TUESDAY: "Martes",
      WEDNESDAY: "Miércoles",
      THURSDAY: "Jueves",
      FRIDAY: "Viernes",
      SATURDAY: "Sábado",
      SUNDAY: "Domingo",
    }
    return dayMap[day] || day
  }
}

export default ConfigPage
