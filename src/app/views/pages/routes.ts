import { Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: '404',
  //   loadComponent: () => import('./page404/page404.component').then(m => m.Page404Component),
  //   data: {
  //     title: 'Page 404'
  //   }
  // },
  // {
  //   path: 'Country',
  //   loadComponent: () => import('./country/country.component').then(m => m.CountryComponent),
  //   data: {
  //     title: 'Countries'
  //   }
  // },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'password-reset',
    loadComponent: () => import('./password-reset/password-reset.component').then(m => m.PasswordResetComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  }
];
