import type { Routes } from "@angular/router"

export const routes: Routes = [
  {
    path: "workshop",
    children: [
      {
        path: "login",
        loadComponent: () => import("./access-and-identity/pages/login.page").then((m) => m.LoginPage),
      },
      {
        path: "register",
        loadComponent: () => import("./access-and-identity/pages/register.page").then((m) => m.RegisterPage),
      },
      {
        path: "onboarding",
        loadComponent: ()=> import("./shared/components/layout-workshop-onboarding/layout-workshop-onboarding.component").then((m) => m.LayoutWorkshopOnboardingComponent),
        children: [
          {
            path: "info",
            /*canActivate: [AuthGuard],*/
            loadComponent: () => import("./workshop/pages/onboarding-workshop-info-page/onboarding-workshop-info-page.component").then((m) => m.OnboardingWorkshopInfoPageComponent),
          },
          {
            path: "schedule",
            /*canActivate: [AuthGuard],*/
            loadComponent: () => import("./workshop/pages/onboarding-schedule-page/onboarding-schedule-page.component").then((m) => m.OnboardingSchedulePageComponent),
          },
        ]
      },
    ],
  },
  {
    path: "",
    children: [
      // Al navegar a "/" redirige a /workshops
      { path: "", pathMatch: "full", redirectTo: "workshops" },

      // WORKSHOP DISCOVERY - LISTADO DE WORKSHOPS
      {
        path: "workshops",
        loadComponent: () =>
          import("./workshop-discovery/pages/workshop-list/workshop-list.page").then((m) => m.default),
      },
      {
        path: "workshops/:id",
        loadComponent: () =>
          import("./workshop-discovery/pages/workshop-detail/workshop-detail.page").then((m) => m.default),
      },

      // VEHICLE TRACKING
      {
        path: "vehicle-tracking",
        loadComponent: () =>
          import("./vehicle-tracking/pages/tracking-input/tracking-input.page").then((m) => m.default),
      },
      {
        path: "vehicle-tracking/:code",
        loadComponent: () =>
          import("./vehicle-tracking/pages/tracking-detail/tracking-detail.page").then((m) => m.default),
      },
    ],
  },
  { path: "**", redirectTo: "" },
]
