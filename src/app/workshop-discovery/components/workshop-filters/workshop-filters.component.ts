import { Component, EventEmitter,  OnInit, Output } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  FormBuilder,  FormGroup, ReactiveFormsModule } from "@angular/forms"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatSelectModule } from "@angular/material/select"
import { MatButtonModule } from "@angular/material/button"
import  { WorkshopDiscoveryService } from "../../services/workshop-discovery.service"
import  { FilterOption, WorkshopFilters } from "../../models"
import  { I18nService } from "../../../shared/services/i18n.service"

@Component({
  selector: "app-workshop-filters",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: "./workshop-filters.component.html",
  styleUrls: ["./workshop-filters.component.css"],
})
export class WorkshopFiltersComponent implements OnInit {
  @Output() filtersChange = new EventEmitter<WorkshopFilters>()

  filtersForm: FormGroup
  regions: FilterOption[] = []
  provinces: FilterOption[] = []
  districts: FilterOption[] = []
  specialties: FilterOption[] = []

  constructor(
    private fb: FormBuilder,
    private workshopService: WorkshopDiscoveryService,
    public i18nService: I18nService,
  ) {
    this.filtersForm = this.fb.group({
      region: [""],
      province: [""],
      district: [""],
      specialty: [""],
    })
  }

  ngOnInit() {
    this.loadRegions()
    this.loadSpecialties()
    this.loadProvinces("")
    this.loadDistricts("")
  }

  loadRegions() {
    this.workshopService.getRegions().subscribe((regions) => {
      this.regions = regions
    })
  }

  loadProvinces(region: string) {
    this.workshopService.getProvinces(region).subscribe((provinces) => {
      this.provinces = provinces
    })
  }

  loadDistricts(province: string) {
    this.workshopService.getDistricts(province).subscribe((districts) => {
      this.districts = districts
    })
  }

  loadSpecialties() {
    this.workshopService.getSpecialties().subscribe((specialties) => {
      this.specialties = specialties
    })
  }

  onRegionChange() {
    const region = this.filtersForm.get("region")?.value
    this.filtersForm.patchValue({ province: "", district: "" })
    this.loadProvinces(region)
    this.loadDistricts("")
  }

  onProvinceChange() {
    const province = this.filtersForm.get("province")?.value
    this.filtersForm.patchValue({ district: "" })
    this.loadDistricts(province)
  }

  onSearch() {
    const filters = this.filtersForm.value as WorkshopFilters
    this.filtersChange.emit(filters)
  }

  translate(key: string): string {
    return this.i18nService.translate(key)
  }
}
