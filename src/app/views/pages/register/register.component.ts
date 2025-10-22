import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

interface ApiResponse {
  status: string;
  message: string;
  data: any;
}


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [
      HttpClientModule,NgIf,FormsModule,ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective]
})
export class RegisterComponent {
  newItem: any = {
    username: '',
    email: '',
    password:'',
    repeatpassword:''
  };

  passwordsMatch: boolean = true;
  constructor(private router: Router,private apiService: ApiService) { }

  onPasswordChange() {
    this.passwordsMatch = this.newItem.password === this.newItem.repeatpassword;
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

  this.apiService.post('Login/SignUp', this.newItem).subscribe({
    next: (response: any) => {
      console.log('Register successful', response);
      if (response.status === 'success') {
        Swal.fire({
          title: 'Success!',
          text: `${response.message}`,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          localStorage.setItem('token', response.data);
          this.router.navigate(['/dashboard']);
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: `${response.message}`,
          icon: 'error',
          confirmButtonText: 'Retry'
        });
      }
    },
    error: (err: any) => {
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