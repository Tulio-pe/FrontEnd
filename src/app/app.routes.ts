import { Routes } from '@angular/router';
import { LoginPage } from './access-and-identity/pages/login.page';
import { RegisterPage } from './access-and-identity/pages/register.page';
import { WorkshopInfoPage } from './access-and-identity/pages/workshop-info.page';
import { authGuard } from './access-and-identity/services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'workshop-info', component: WorkshopInfoPage, canActivate: [authGuard] },
  { path: 'home', loadChildren: () => import('./home/home.routes').then(m => m.HOME_ROUTES), canActivate: [authGuard] }
];
