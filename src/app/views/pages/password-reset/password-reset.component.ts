import { Component } from '@angular/core';
import { NgStyle,NgIf } from '@angular/common';
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
interface ApiResponse {
  status: string;
  message: string;
  data: any;
}

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
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
    NgStyle,NgIf,
    RouterLink,
    RouterOutlet,
  ],
})
export class PasswordResetComponent {
  newItem: any = {
    email: '',
    password:'',
    role:''
  };
  newItemII: any = {
    repeatPassword:''
  };

  passwordsMatch: boolean = true;
  constructor(private router: Router,private apiService: ApiService) { }

  onPasswordChange() {
    this.passwordsMatch = this.newItem.password === this.newItemII.repeatpassword;
  }
  onSubmit() {
  if (!this.passwordsMatch) {
    Swal.fire({
      title: 'Error',
      text: 'Passwords do not match!',
      icon: 'error',
      confirmButtonText: 'Retry'
    });
    return;
  }
  this.apiService.post('Login/ResetPassword', this.newItem).subscribe({
    next: (response: any) => {
      console.log('Register successful', response);
      if (response.status === 'success') {
        Swal.fire({
          title: 'Success!',
          text: `${response.message}`,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['/dashboard']);
        });
      } else {

      console.log('Register successful', response);
        Swal.fire({
          title: 'Error',
          text: `${response.message}`,
          icon: 'error',
          confirmButtonText: 'Retry'
        });
      }
    },
    error: (err: any) => {

      console.log('Register successful', err);
      Swal.fire({
        title: 'Error',
        text: `${err.error.message}`,
        icon: 'error',
        confirmButtonText: 'Retry'
      });
    }
  });
}
}