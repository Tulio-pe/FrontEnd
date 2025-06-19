import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  FormBuilder,  FormGroup, Validators, ReactiveFormsModule,  FormArray } from "@angular/forms"
import {  MatDialogRef, MatDialogModule } from "@angular/material/dialog"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatChipsModule } from "@angular/material/chips"
import { MatCheckboxModule } from "@angular/material/checkbox"
import  { RepairService } from "../../services/repair.service"
import  { I18nService } from "../../../shared/services/i18n.service"

@Component({
  selector: "app-create-repair-dialog",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatCheckboxModule,
  ],
  templateUrl: "./create-repair-dialog.component.html",
  styleUrls: ["./create-repair-dialog.component.css"],
})
export class CreateRepairDialogComponent implements OnInit {
  repairForm: FormGroup
  availableServices: string[] = []
  isSubmitting = false

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateRepairDialogComponent>,
    private repairService: RepairService,
    private i18nService: I18nService,
  ) {
    this.repairForm = this.fb.group({
      plateNumber: ["", [Validators.required, Validators.pattern(/^[A-Z0-9]{3}-[A-Z0-9]{3}$/)]],
      vehicleInfo: this.fb.group({
        brand: ["", Validators.required],
        model: ["", Validators.required],
        year: ["", [Validators.required, Validators.min(1990), Validators.max(new Date().getFullYear())]],
        color: ["", Validators.required],
      }),
      services: this.fb.array([], Validators.required),
    })
  }

  ngOnInit() {
    this.availableServices = this.repairService.getAvailableServices()
  }

  get servicesFormArray() {
    return this.repairForm.get("services") as FormArray
  }

  onServiceChange(service: string, checked: boolean) {
    if (checked) {
      this.servicesFormArray.push(this.fb.control(service))
    } else {
      const index = this.servicesFormArray.controls.findIndex((x) => x.value === service)
      if (index >= 0) {
        this.servicesFormArray.removeAt(index)
      }
    }
  }

  isServiceSelected(service: string): boolean {
    return this.servicesFormArray.controls.some((control) => control.value === service)
  }

  onSubmit() {
    if (this.repairForm.valid) {
      this.isSubmitting = true

      const formValue = this.repairForm.value
      this.repairService.createRepair(formValue).subscribe({
        next: (repair) => {
          this.dialogRef.close(repair)
        },
        error: (error) => {
          console.error("Error creating repair:", error)
          this.isSubmitting = false
        },
      })
    }
  }

  onCancel() {
    this.dialogRef.close()
  }

  translate(key: string): string {
    return this.i18nService.translate(key)
  }
}
