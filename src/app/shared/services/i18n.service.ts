import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class I18nService {
  private currentLang = new BehaviorSubject<string>("es")
  public currentLang$ = this.currentLang.asObservable()

  private translations: { [key: string]: { [key: string]: string } } = {
    es: {
      "welcome.user": "Bienvenido Usuario",
      "filters.region": "Región",
      "filters.province": "Provincia",
      "filters.district": "Distrito",
      "filters.specialty": "Especialidad",
      "filters.all.regions": "Todas las regiones",
      "filters.all.provinces": "Todas las provincias",
      "filters.all.districts": "Todos los distritos",
      "filters.all.specialties": "Todas las especialidades",
      "button.search": "Buscar",
      "button.see.more": "Ver más",
      "button.contact": "Contactar",
      "button.vehicle.tracking": "Seguimiento de vehículo",
      "button.manage.workshop": "Gestiona tu taller",
      "button.back": "Volver",
      "workshop.description": "Descripción",
      "workshop.specialties": "Especialidades",
      "workshop.contact.info": "Información de contacto",
      "workshop.schedule": "Horarios de atención",
      "workshop.services": "Servicios",
      "workshop.closed": "Cerrado",
      "workshop.reviews": "reseñas",
      "no.results": "No se encontraron talleres con los filtros seleccionados.",
      loading: "Cargando...",
      "specialties.mechanics": "Mecánica",
      "specialties.electricity": "Electricidad",
      "specialties.painting": "Pintura",
      "specialties.bodywork": "Planchado",
      "days.monday": "Lunes",
      "days.tuesday": "Martes",
      "days.wednesday": "Miércoles",
      "days.thursday": "Jueves",
      "days.friday": "Viernes",
      "days.saturday": "Sábado",
      "days.sunday": "Domingo",
      // Vehicle Tracking
      "tracking.title": "N° de tracking",
      "tracking.subtitle": "Código único de tu auto o código",
      "tracking.code.label": "Código de seguimiento",
      "tracking.code.placeholder": "Ingresa tu código",
      "tracking.code.required": "El código es requerido",
      "tracking.code.minlength": "El código debe tener al menos 6 caracteres",
      "tracking.submit": "Enviar código",
      "tracking.example.title": "Códigos de ejemplo:",
      "tracking.detail.title": "Seguimiento de tu vehículo",
      "tracking.contact.workshop": "Contactar con consulta",
      "tracking.vehicle.info": "Información de la reparación",
      "tracking.vehicle.plate": "N° de placa",
      "tracking.vehicle.brand": "Marca",
      "tracking.vehicle.model": "Modelo",
      "tracking.vehicle.year": "Año",
      "tracking.vehicle.color": "Color",
      "tracking.current.status": "Estado actual",
      "tracking.last.updated": "Última actualización",
      "tracking.services": "Servicios",
      "tracking.status.history": "Historial de estados",
      "tracking.estimated.completion": "Finalización estimada",
      "tracking.code": "Código de seguimiento",
      "tracking.loading": "Cargando información del vehículo...",
      "tracking.status.completed": "Completado",
      "tracking.status.in-progress": "En progreso",
      "tracking.status.pending": "Pendiente",
      "tracking.status.started": "Iniciado",
      "tracking.status.advanced": "Avanzado",
    },
    en: {
      "welcome.user": "Welcome User",
      "filters.region": "Region",
      "filters.province": "Province",
      "filters.district": "District",
      "filters.specialty": "Specialty",
      "filters.all.regions": "All regions",
      "filters.all.provinces": "All provinces",
      "filters.all.districts": "All districts",
      "filters.all.specialties": "All specialties",
      "button.search": "Search",
      "button.see.more": "See more",
      "button.contact": "Contact",
      "button.vehicle.tracking": "Vehicle tracking",
      "button.manage.workshop": "Manage your workshop",
      "button.back": "Back",
      "workshop.description": "Description",
      "workshop.specialties": "Specialties",
      "workshop.contact.info": "Contact information",
      "workshop.schedule": "Opening hours",
      "workshop.services": "Services",
      "workshop.closed": "Closed",
      "workshop.reviews": "reviews",
      "no.results": "No workshops found with the selected filters.",
      loading: "Loading...",
      "specialties.mechanics": "Mechanics",
      "specialties.electricity": "Electricity",
      "specialties.painting": "Painting",
      "specialties.bodywork": "Bodywork",
      "days.monday": "Monday",
      "days.tuesday": "Tuesday",
      "days.wednesday": "Wednesday",
      "days.thursday": "Thursday",
      "days.friday": "Friday",
      "days.saturday": "Saturday",
      "days.sunday": "Sunday",
      // Vehicle Tracking
      "tracking.title": "Tracking N°",
      "tracking.subtitle": "Your car's unique code or tracking code",
      "tracking.code.label": "Tracking code",
      "tracking.code.placeholder": "Enter your code",
      "tracking.code.required": "Code is required",
      "tracking.code.minlength": "Code must be at least 6 characters",
      "tracking.submit": "Submit code",
      "tracking.example.title": "Example codes:",
      "tracking.detail.title": "Vehicle tracking",
      "tracking.contact.workshop": "Contact for consultation",
      "tracking.vehicle.info": "Repair information",
      "tracking.vehicle.plate": "License plate",
      "tracking.vehicle.brand": "Brand",
      "tracking.vehicle.model": "Model",
      "tracking.vehicle.year": "Year",
      "tracking.vehicle.color": "Color",
      "tracking.current.status": "Current status",
      "tracking.last.updated": "Last updated",
      "tracking.services": "Services",
      "tracking.status.history": "Status history",
      "tracking.estimated.completion": "Estimated completion",
      "tracking.code": "Tracking code",
      "tracking.loading": "Loading vehicle information...",
      "tracking.status.completed": "Completed",
      "tracking.status.in-progress": "In progress",
      "tracking.status.pending": "Pending",
      "tracking.status.started": "Started",
      "tracking.status.advanced": "Advanced",
    },
  }

  constructor() {
    const savedLang = localStorage.getItem("language") || "es"
    this.currentLang.next(savedLang)
  }

  setLanguage(lang: string) {
    this.currentLang.next(lang)
    localStorage.setItem("language", lang)
  }

  getCurrentLanguage(): string {
    return this.currentLang.value
  }

  translate(key: string): string {
    const lang = this.getCurrentLanguage()
    return this.translations[lang]?.[key] || key
  }
}
