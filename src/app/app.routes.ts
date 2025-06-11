import { Routes } from '@angular/router';
import {AppRoutes} from './public/services/routes';

export const routes: Routes = [
  {
    path: AppRoutes.WORKSHOP.ROOT,
    children: [
      {
        path: AppRoutes.WORKSHOP.LOGIN,
        loadComponent: () =>
          import('./access-and-identity/pages/login.page').then(m => m.LoginPage)
      },
      {
        path: AppRoutes.WORKSHOP.REGISTER,
        loadComponent: () =>
          import('./access-and-identity/pages/register.page').then(m => m.RegisterPage)
      },
      {
        path: AppRoutes.WORKSHOP.ONBOARDING.ROOT,
        loadComponent: () =>
          import('./shared/components/layout-workshop-onboarding/layout-workshop-onboarding.component').then(m => m.LayoutWorkshopOnboardingComponent),
        children: [
          {
            path: AppRoutes.WORKSHOP.ONBOARDING.INFO,
            /*canActivate: [AuthGuard],*/
            loadComponent: () =>
              import('./workshop/pages/onboarding-workshop-info-page/onboarding-workshop-info-page.component').then(m => m.OnboardingWorkshopInfoPageComponent)
          },
          {
            path: AppRoutes.WORKSHOP.ONBOARDING.SCHEDULE,
            /*canActivate: [AuthGuard],*/
            loadComponent: () =>
              import('./workshop/pages/onboarding-schedule-page/onboarding-schedule-page.component').then(m => m.OnboardingSchedulePageComponent)
          },
        ]
      },
      {
        path: "",
        loadComponent: ()=>
          import("./shared/components/layout-workshop-panel/layout-workshop-panel.component").then(m => m.LayoutWorkshopPanelComponent),
        children:[
          {
            path: AppRoutes.WORKSHOP.DASHBOARD,
            /*canActivate: [AuthGuard],*/
            loadComponent: () =>
              import('./repair-management/pages/dashboard.page').then(m => m.DashboardPage)
          },
          {
            path: AppRoutes.WORKSHOP.CARS,
            /*canActivate: [AuthGuard],*/
            loadComponent: () =>
              import('./repair-management/pages/list-cars-page/list-cars-page.component').then(m => m.ListCarsPageComponent)
          },
          {
            path: AppRoutes.WORKSHOP.CONFIG,
            loadComponent: ()=>
              import("./workshop/pages/configuration-page/configuration-page.component").then(m=>m.ConfigurationPageComponent)
          }
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
