import { Routes } from '@angular/router';
import { isLoggedIn, shouldLogdIn } from './guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    canActivate: [isLoggedIn],
  },
  {
    path: 'unlogged',
    loadComponent: () =>
      import('./pages/unlogged/unlogged.component').then(
        (m) => m.UnloggedComponent
      ),
    canActivate: [shouldLogdIn],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
    canActivate: [shouldLogdIn],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    canActivate: [shouldLogdIn],
  },
  {
    path: '**',
    redirectTo: 'unlogged',
  },
];
