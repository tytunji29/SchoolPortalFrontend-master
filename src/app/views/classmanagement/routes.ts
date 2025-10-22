import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Class Management'
    },
    children: [
      
      {
        path: 'classes',
        loadComponent: () => import('./classes/classes.component').then(m => m.ClassesComponent),
        data: {
          title: 'Classes'
        }
      },
      {
        path: 'classeslevel',
        loadComponent: () => import('./classeslevel/classeslevel.component').then(m => m.ClasseslevelComponent),
        data: {
          title: 'Classes Level'
        }
      },
      {
        path: 'mapsubjecttoteacher',
        loadComponent: () => import('./mapsubjecttoteacher/mapsubjecttoteacher.component').then(m => m.MapsubjecttoteacherComponent),
        data: {
          title: 'Map Subject To Teacher'
        }
      }
    ]
  }
];


