import { Injectable, inject } from "@angular/core"
import type { Observable } from "rxjs"
import type { WorkshopProfile, WorkshopSchedule } from "../models"
import { FakeApiService } from "../../shared/services/fake-api.service"

@Injectable({
  providedIn: "root",
})
export class WorkshopConfigService {
  private fakeApi = inject(FakeApiService)

  getProfile(): Observable<WorkshopProfile> {
    return this.fakeApi.getProfile()
  }

  updateProfile(profile: WorkshopProfile): Observable<WorkshopProfile> {
    return this.fakeApi.updateProfile(profile)
  }

  getSchedule(): Observable<WorkshopSchedule> {
    return this.fakeApi.getSchedule()
  }

  updateSchedule(schedule: WorkshopSchedule): Observable<WorkshopSchedule> {
    return this.fakeApi.updateSchedule(schedule)
  }

  getAvailableServices(): string[] {
    return this.fakeApi.getAvailableServices()
  }

  // Helper methods to get current data
  getCurrentProfile(): WorkshopProfile {
    return this.fakeApi.getCurrentProfile()
  }

  getCurrentSchedule(): WorkshopSchedule {
    return this.fakeApi.getCurrentSchedule()
  }
}
