import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
      },
      {
        path: 'school',
        loadChildren: () => import('./views/school/routes').then((m) => m.routes)
      },
      {
        path: 'parent',
        loadChildren: () => import('./views/parent/routes').then((m) => m.routes)
      },
      {
        path: 'staff',
        loadChildren: () => import('./views/staff/routes').then((m) => m.routes)
      },
      {
        path: 'student',
        loadChildren: () => import('./views/student/routes').then((m) => m.routes)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/routes').then((m) => m.routes)
      },
      {
        path: 'classmanagement',
        loadChildren: () => import('./views/classmanagement/routes').then((m) => m.routes)
      },
      {
        path: 'teachers',
        loadChildren: () => import('./views/teachers/routes').then((m) => m.routes)
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/routes').then((m) => m.routes)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/routes').then((m) => m.routes)
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/routes').then((m) => m.routes)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/routes').then((m) => m.routes)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/routes').then((m) => m.routes)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/routes').then((m) => m.routes)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/charts/routes').then((m) => m.routes)
      },
      {
        path: 'pages',
        loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
      }
    ]
  },
  // {
  //   path: 'country',
  //   loadComponent: () => import('./views/pages/country/country.component').then(m => m.CountryComponent),
  //   data: {
  //     title: 'Countries'
  //   }
  // },
  // {
  //   path: '500',
  //   loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
  //   data: {
  //     title: 'Page 500'
  //   }
  // },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'classes',
    loadComponent: () => import('./views/classmanagement/classes/classes.component').then(m => m.ClassesComponent),
    data: {
      title: 'Classes Page'
    }
  },
  {
    path: 'classes',
    loadComponent: () => import('./views/teachers/classes/classes.component').then(m => m.ClassesComponent),
    data: {
      title: 'Classes Page'
    }
  },
  {
    path: 'students',
    loadComponent: () => import('./views/teachers/students/students.component').then(m => m.StudentsComponent),
    data: {
      title: 'Classes Page'
    }
  },
  {
    path: 'subjects',
    loadComponent: () => import('./views/teachers/subjects/subjects.component').then(m => m.SubjectsComponent),
    data: {
      title: 'Classes Page'
    }
  },
  {
    path: 'passwordreset',
    loadComponent: () => import('./views/pages/password-reset/password-reset.component').then(m => m.PasswordResetComponent),
    data: {
      title: 'Classes Page'
    }
  },
  {
    path: 'classeslevel',
    loadComponent: () => import('./views/classmanagement/classeslevel/classeslevel.component').then(m => m.ClasseslevelComponent),
    data: {
      title: 'Classes Level Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'parent',
    loadComponent: () => import('./views/parent/parent.component').then(m => m.ParentComponent),
    data: {
      title: 'Parents Page'
    }
  },
  {
    path: 'staff',
    loadComponent: () => import('./views/staff/staff.component').then(m => m.StaffComponent),
    data: {
      title: 'Staffs Page'
    }
  },
  {
    path: 'student',
    loadComponent: () => import('./views/student/student.component').then(m => m.StudentComponent),
    data: {
      title: 'Students Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];


