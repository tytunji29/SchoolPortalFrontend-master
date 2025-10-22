import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./staff.component').then(m => m.StaffComponent),
    data: {
      title: 'Staffs'
    }
  }
];

