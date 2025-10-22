import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
} from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2';

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}
const DASHBOARD_ROUTE = '/dashboard';
const PASSWORD_RESET_ROUTE = '/pages/password-reset';
const SCHOOL_ROUTE = '/school';
const ROLE_SUPER_ADMIN = 'SuperAdmin';

interface Item {
  name: string;
  createdAt: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    HttpClientModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    FormsModule,
    NgStyle,
    RouterLink,
    RouterOutlet,
  ],
})
export class LoginComponent {
  newItem: any = {
    email: '',
    password: '',
  };

  constructor(private router: Router, private apiService: ApiService) {
   
  }
 
  onSubmit(): void {
    localStorage.removeItem('token');
  
    this.apiService.post<ApiResponse<Item>>('Login/SignIn', this.newItem).subscribe({
      next: (response: any) => {
        console.log('Login response:', response);
        this.newItem = { email: '', password: '' }; // Reset the form
  
        if (response.status === 'success') {
          Swal.fire({
            title: 'Success!',
            text: `${response.message}`,
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            // Save the token and role
            localStorage.setItem('token', `Bearer ${response.data.token}`);
            localStorage.setItem('role', response.data.role);
            localStorage.setItem('userId', response.data.userId);
  
            // Check for first login
            if (response.data.firstLogin == true) {
              this.router.navigate([PASSWORD_RESET_ROUTE]);
            } 
            else {
              
              if (response.data.role === ROLE_SUPER_ADMIN) {
                this.router.navigate([SCHOOL_ROUTE]);
              } else {
                
                this.router.navigate([DASHBOARD_ROUTE]);
              }
            }
          });
        } else {
          // Handle other responses if necessary
          Swal.fire({
            title: 'Error',
            text: `${response.message}`,
            icon: 'error',
            confirmButtonText: 'Retry',
          });
        }
      },
      error: (err: any) => {
        Swal.fire({
          title: 'Error',
          text: `${err.error.message}`,
          icon: 'error',
          confirmButtonText: 'Retry',
        });
      },
    });
  }
}
