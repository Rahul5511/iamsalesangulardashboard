import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component/login.component.component';
import { DashboardComponent } from './features/dashboard.component/dashboard.component.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];
