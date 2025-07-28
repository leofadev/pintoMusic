import { Routes } from '@angular/router';
import { introGuard } from './guards/intro.guard';
import { AuthGuard} from './guards/auth.guard';

/* Agregar el guard de login  */
export const routes: Routes = [
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
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage), canActivate: [introGuard]
  },
  {
    path: 'menu',
    loadComponent: () => import('./menu/menu.page').then(m => m.MenuPage), canActivate: [introGuard, AuthGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage)
      },
    ]
  },
  {
    path: 'songs-modal',
    loadComponent: () => import('./songs-modal/songs-modal.page').then( m => m.SongsModalPage)
  },



];
