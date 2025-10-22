import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./school.component').then(m => m.SchoolComponent),
    data: {
      title: 'Schools'
    }
  }
];

