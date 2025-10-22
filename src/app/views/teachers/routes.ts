import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Teacher Management'
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
        path: 'students',
        loadComponent: () => import('./students/students.component').then(m => m.StudentsComponent),
        data: {
          title: 'My Students'
        }
      },
      {
        path: 'subjects',
        loadComponent: () => import('./subjects/subjects.component').then(m => m.SubjectsComponent),
        data: {
          title: 'My Subjects'
        }
      },
      {
        path: 'mytimetable',
        loadComponent: () => import('./mytimetable/mytimetable.component').then(m => m.MytimetableComponent),
        data: {
          title: 'My Timetable'
        }
      }
    ]
  }
];


