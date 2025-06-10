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
        path: "onboarding/info",
        /*canActivate: [AuthGuard],*/
        loadComponent: () => import("./workshop/pages/workshop-info.page").then((m) => m.WorkshopInfoPage),
      },
      {
        path: "onboarding/schedule",
        /*canActivate: [AuthGuard],*/
        loadComponent: () => import("./workshop/pages/schedule-hours.page").then((m) => m.ScheduleHoursPage),
      },
      {
        path: "",
        loadComponent: () =>
          import("./shared/components/layout-workshop-panel/layout-workshop-panel.component").then(
            (m) => m.LayoutWorkshopPanelComponent,
          ),
        children: [
          {
            path: "dashboard",
            /*canActivate: [AuthGuard],*/
            loadComponent: () => import("./repair-management/pages/dashboard.page").then((m) => m.DashboardPage),
          },
          {
            path: "cars",
            /*canActivate: [AuthGuard],*/
            loadComponent: () =>
              import("./repair-management/pages/list-cars-page/list-cars-page.component").then(
                (m) => m.ListCarsPageComponent,
              ),
          },
        ],
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

      // CAR-TRACKING - Rutas temporalmente deshabilitadas hasta implementar los componentes
      // {
      //   path: 'car-tracking',
      //   loadComponent: () =>
      //     import('./car-tracking/pages/list-car-tracking.page')
      //       .then(m => m.ListCarTrackingPage)
      // },
      // {
      //   path: 'car-tracking/:code',
      //   loadComponent: () =>
      //     import('./car-tracking/pages/car-tracking-detail.page')
      //       .then(m => m.CarTrackingDetailPage)
      // },
    ],
  },
  { path: "**", redirectTo: "" },
]
