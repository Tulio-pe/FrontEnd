import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: "workshop",
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./access-and-identity/pages/login.page').then(m => m.LoginPage)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./access-and-identity/pages/register.page').then(m => m.RegisterPage)
      },
      {
        path: 'onboarding/info',
        /*canActivate: [AuthGuard],*/
        loadComponent: () =>
          import('./workshop/pages/workshop-info.page').then(m => m.WorkshopInfoPage)
      },
      {
        path: 'onboarding/schedule',
        /*canActivate: [AuthGuard],*/
        loadComponent: () =>
          import('./workshop/pages/schedule-hours.page').then(m => m.ScheduleHoursPage)
      },
      {
        path: "",
        loadComponent: ()=>
          import("./shared/components/layout-workshop-panel/layout-workshop-panel.component").then(m => m.LayoutWorkshopPanelComponent),
        children:[
          {
            path: 'dashboard',
            /*canActivate: [AuthGuard],*/
            loadComponent: () =>
              import('./repair-management/pages/dashboard.page').then(m => m.DashboardPage)
          },
          {
            path: 'cars',
            /*canActivate: [AuthGuard],*/
            loadComponent: () =>
              import('./repair-management/pages/list-cars-page/list-cars-page.component').then(m => m.ListCarsPageComponent)
          },
        ]
      },
    /*{
       path: 'configuration',
     canActivate: [AuthGuard],
        loadComponent: () =>
          import('./repair-management/pages/dashboard-work-shop-page/dashboard-work-shop-page.component').then(m => m.DashboardWorkShopPageComponent)
      },*/
    ]
  },
  {
    path: '',
    /*loadComponent: () =>
      import('./shared/layouts/main-layout/main-layout.component')
        .then(m => m.MainLayoutComponent),*/
    children: [
      // Al navegar a “/” redirige a /workshops
      { path: '', pathMatch: 'full', redirectTo: 'workshops' },

      // LISTADO DE WORKSHOPS
      {
        path: 'workshops',
       /* loadComponent: () =>
          import('./workshops/pages/list-workshops.page')
            .then(m => m.ListWorkshopsPage)*/
      },
      {
        path: 'workshops/:id',
        /*loadComponent: () =>
          import('./workshops/pages/workshop-detail.page')
            .then(m => m.WorkshopDetailPage)*/
      },

      // CAR-TRACKING
      {
        path: 'car-tracking',
        /*loadComponent: () =>
          import('./car-tracking/pages/list-car-tracking.page')
            .then(m => m.ListCarTrackingPage)*/
      },
      {
        path: 'car-tracking/:code',
        /*loadComponent: () =>
          import('./car-tracking/pages/car-tracking-detail.page')
            .then(m => m.CarTrackingDetailPage)*/
      },
    ]
  },
  { path: '**', redirectTo: '' }
];
/*Add commentMore actions
export const routes: Routes = [Add commentMore actions
  {
    path: 'workshop',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/pages/login.page').then(m => m.LoginPage)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/pages/register.page').then(m => m.RegisterPage)
      },
      {
        path: 'onboarding/info',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./features/workshop/pages/onboarding-info.page').then(m => m.OnboardingInfoPage)
      },
      {
        path: 'onboarding/schedule',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./features/workshop/pages/onboarding-schedule.page').then(m => m.OnboardingSchedulePage)
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./features/workshop/pages/dashboard.page').then(m => m.DashboardPage)
      },
      {
        path: 'cars',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./features/workshop/pages/cars.page').then(m => m.CarsPage)
      },
      {
        path: 'configuration',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./features/workshop/pages/configuration.page').then(m => m.ConfigurationPage)
      },
    ]
  },
  {
    path: 'workshops',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/public/pages/workshop-list.page').then(m => m.WorkshopListPage)
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./features/public/pages/workshop-details.page').then(m => m.WorkshopDetailsPage)
      },
    ]
  },
  {
    path: 'tracking',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/public/pages/tracking-input.page').then(m => m.TrackingInputPage)
      },
      {
        path: ':code',
        loadComponent: () =>
          import('./features/public/pages/tracking-details.page').then(m => m.TrackingDetailsPage)
      },
    ]
  },
  {
    path: '',
    redirectTo: AppRoutes.WORKSHOP.LOGIN,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: AppRoutes.PUBLIC.WORKSHOP_LIST
  }
];
*/
