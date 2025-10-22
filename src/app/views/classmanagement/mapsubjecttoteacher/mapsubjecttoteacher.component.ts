import { Component, ViewChild } from '@angular/core';
import { NgStyle, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  FormDirective,
  FormLabelDirective,
  FormControlDirective,
  ButtonDirective,
  ModalComponent,  // Correct component for handling modals
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalBodyComponent,
  ModalFooterComponent,
  ModalToggleDirective,
  ButtonCloseDirective,
  ThemeDirective,
  PopoverDirective,
  TooltipDirective
} from '@coreui/angular';
import { Router } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';

import Swal from 'sweetalert2';
import { ApiService } from '../../../services';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SharedModule } from '../../../shared/shared.module'; // Adjust the path as necessary


interface ApiResponse {
  status: string;
  message: string;
  data: any[];
}
@Component({
  selector: 'app-mapsubjecttoteacher',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    ReactiveFormsModule,
    FormsModule,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    ButtonDirective,
    NgFor,
    NgStyle,
    NgIf,
    SharedModule,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalToggleDirective,
    ButtonCloseDirective,
    ThemeDirective,
    NgTemplateOutlet,
    PopoverDirective,
    TooltipDirective,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './mapsubjecttoteacher.component.html',
  styleUrl: './mapsubjecttoteacher.component.scss',
})

export class MapsubjecttoteacherComponent {
  newItem: any = {
    email: '',
    password: '',
    role: '',
  };
  newItemII: any = {
    repeatPassword: '',
  };

  classLevels: any[] = [];
  classTeachers: any[] = [];
  classSubject: any[] = [];
  conList: any[] = [];
  
  currentCountry: any = { name: '',class:'',classTeacher:'',classAssistTeacher:'', subject:'' };

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.refreshData();
    this.getClass();
    this.getClassTeachers();
    this.getSubjects();
  }

  refreshData(): void {
    this.apiService.get<ApiResponse>('Classes/GetAll').subscribe({
      next: (response: ApiResponse) => {
        if (response.status === 'success') {
          this.conList = response.data;
        } else {
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
  getClass() {
    this.apiService.get<ApiResponse>('Classes/GetAll').subscribe({
      next: (response) => {
        console.log(response.data)
        this.classLevels = response.data;
      },
      error: (err) => {
        console.error('Error fetching class levels', err);
      },
    });
  }
  getClassTeachers() {
    this.apiService.get<ApiResponse>('Staff/GetAllTeacherAndAssist').subscribe({
      next: (response) => {
        this.classTeachers = response.data;
      },
      error: (err) => {
        console.error('Error fetching class levels', err);
      },
    });
  }
  getSubjects() {
    this.apiService.get<ApiResponse>('Subject/GetAll').subscribe({
      next: (response) => {
        
        console.log(response.data)
        this.classSubject = response.data;
      },
      error: (err) => {
        console.error('Error fetching class levels', err);
      },
    });
  }
  onSubmit() {
    const cnValu = `${this.currentCountry.class}`
    const tesa =`${this.currentCountry.classTeacher}`
    const asstesa =`${this.currentCountry.subject}`
    const payload = {
      classId:cnValu,
      teacherId:tesa,
      subjectId:asstesa
    };
    console.log(payload)
    this.apiService.post('Subject/MapToSubject', payload).subscribe({
      next: (response: any) => {
        console.log('Register successful', response);
        if (response.status === 'success') {
          Swal.fire({
            title: 'Success!',
            text: `${response.message}`,
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            localStorage.setItem('token', response.data.token);
            this.router.navigate(['/dashboard']);
          });
        } else {
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
