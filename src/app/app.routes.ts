import { Routes } from '@angular/router';
import { introGuard } from './guards/intro.guard';
import { authGuard } from './guards/auth.guard';

/* Agregar el guard de login  */
export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage), canActivate: [introGuard, authGuard]
  },
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full',
  },
  {
    path: 'intro',
    loadComponent: () => import('./intro/intro.page').then( m => m.IntroPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage), canActivate: [introGuard]
  },

];
