import { Injectable } from "@angular/core"
import {  Observable, of } from "rxjs"
import { map } from "rxjs/operators"
import  { Workshop, WorkshopFilters, FilterOption } from "../models"

@Injectable({
  providedIn: "root",
})
export class WorkshopDiscoveryService {
  private mockWorkshops: Workshop[] = [
    {
      id: "1",
      name: "Taller Mecánico Express",
      companyName: "Nombre de la empresa",
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
        {
          name: "Frenos",
          description: "Mantenimiento y reparación de frenos",
          estimatedTime: "1 hora",
          price: "S/. 200",
        },
      ],
      isOpen: true,
    },
    {
      id: "2",
      name: "Taller San Isidro",
      companyName: "Nombre de la empresa",
      description: "Especialistas en electricidad automotriz",
      imageUrl: "/assets/img/taller2.png",
      region: "lima",
      province: "lima",
      district: "san-isidro",
      specialties: ["electricidad"],
      rating: 4.2,
      reviewCount: 89,
      address: "Av. Javier Prado 456, San Isidro",
      phone: "+51 999 777 666",
      email: "contacto@tallersanisidro.com",
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
          name: "Diagnóstico eléctrico",
          description: "Revisión completa del sistema eléctrico",
          estimatedTime: "1 hora",
          price: "S/. 120",
        },
        {
          name: "Reparación de alternador",
          description: "Reparación y mantenimiento",
          estimatedTime: "2 horas",
          price: "S/. 250",
        },
      ],
      isOpen: true,
    },
    {
      id: "3",
      name: "Taller Surco",
      companyName: "Nombre de la empresa",
      description: "Especialistas en pintura y planchado",
      imageUrl: "/assets/img/taller3.png",
      region: "lima",
      province: "lima",
      district: "surco",
      specialties: ["pintura", "planchado"],
      rating: 4.7,
      reviewCount: 156,
      address: "Av. Benavides 789, Surco",
      phone: "+51 999 555 444",
      email: "contacto@tallersurco.com",
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
          name: "Pintura completa",
          description: "Pintura completa del vehículo",
          estimatedTime: "3 días",
          price: "S/. 1500",
        },
        {
          name: "Planchado y pintura",
          description: "Reparación de abolladuras",
          estimatedTime: "1 día",
          price: "S/. 400",
        },
      ],
      isOpen: true,
    },
    // Agregar más talleres con diferentes ubicaciones y especialidades
    ...Array.from({ length: 5 }, (_, i) => ({
      id: (i + 4).toString(),
      name: `Taller ${i + 4}`,
      companyName: "Nombre de la empresa",
      description: "Descripción del taller",
      imageUrl: "/assets/img/taller4.png",
      region: i % 2 === 0 ? "lima" : "arequipa",
      province: i % 2 === 0 ? "lima" : "arequipa",
      district: ["la-molina", "barranco", "callao"][i % 3],
      specialties: [["mecanica"], ["electricidad"], ["pintura"], ["planchado"]][i % 4],
      rating: 4.0 + Math.random(),
      reviewCount: Math.floor(Math.random() * 200) + 50,
      address: `Dirección ${i + 4}`,
      phone: `+51 999 ${String(i + 4).padStart(3, "0")} 777`,
      email: `taller${i + 4}@email.com`,
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
        { name: "Servicio 1", description: "Descripción del servicio", estimatedTime: "1 hora", price: "S/. 100" },
        { name: "Servicio 2", description: "Descripción del servicio", estimatedTime: "2 horas", price: "S/. 200" },
      ],
      isOpen: true,
    })),
  ]

  constructor() {}

  getWorkshops(filters?: WorkshopFilters): Observable<Workshop[]> {
    return of(this.mockWorkshops).pipe(
      map((workshops) => {
        if (!filters) return workshops

        return workshops.filter((workshop) => {
          const regionMatch = !filters.region || workshop.region === filters.region
          const provinceMatch = !filters.province || workshop.province === filters.province
          const districtMatch = !filters.district || workshop.district === filters.district
          const specialtyMatch = !filters.specialty || workshop.specialties.includes(filters.specialty)

          return regionMatch && provinceMatch && districtMatch && specialtyMatch
        })
      }),
    )
  }

  getWorkshopById(id: string): Observable<Workshop | null> {
    return of(this.mockWorkshops.find((w) => w.id === id) || null)
  }

  getRegions(): Observable<FilterOption[]> {
    return of([
      { value: "", label: "filters.all.regions" },
      { value: "lima", label: "Lima" },
      { value: "arequipa", label: "Arequipa" },
      { value: "cusco", label: "Cusco" },
    ])
  }

  getProvinces(region: string): Observable<FilterOption[]> {
    const provinces =
      region === "lima"
        ? [
          { value: "", label: "filters.all.provinces" },
          { value: "lima", label: "Lima" },
          { value: "callao", label: "Callao" },
        ]
        : region === "arequipa"
          ? [
            { value: "", label: "filters.all.provinces" },
            { value: "arequipa", label: "Arequipa" },
          ]
          : [{ value: "", label: "filters.all.provinces" }]

    return of(provinces)
  }

  getDistricts(province: string): Observable<FilterOption[]> {
    const districts =
      province === "lima"
        ? [
          { value: "", label: "filters.all.districts" },
          { value: "miraflores", label: "Miraflores" },
          { value: "san-isidro", label: "San Isidro" },
          { value: "surco", label: "Surco" },
          { value: "la-molina", label: "La Molina" },
          { value: "barranco", label: "Barranco" },
        ]
        : province === "callao"
          ? [
            { value: "", label: "filters.all.districts" },
            { value: "callao", label: "Callao" },
          ]
          : [{ value: "", label: "filters.all.districts" }]

    return of(districts)
  }

  getSpecialties(): Observable<FilterOption[]> {
    return of([
      { value: "", label: "filters.all.specialties" },
      { value: "mecanica", label: "specialties.mechanics" },
      { value: "electricidad", label: "specialties.electricity" },
      { value: "pintura", label: "specialties.painting" },
      { value: "planchado", label: "specialties.bodywork" },
    ])
  }
}
