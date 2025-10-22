import { Component, ViewChild } from '@angular/core';
import { NgStyle, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { Router } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';
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
  selector: 'app-mytimetable',
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
  ],
  templateUrl: './mytimetable.component.html',
  styleUrl: './mytimetable.component.scss'
})
export class MytimetableComponent {
  conList: any[] = [];
  searchText: string = '';
  p: number = 1;
  isModalVisible: boolean = false; // Initially set to false
  isEditMode: boolean = false;
  classLevels: any[] = [];
  classTeachers: any[] = [];
  currentCountry: any = { name: '',classLevel:'',classTeacher:'' };
  constructor(private router: Router,private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.get<ApiResponse>(`Subject/GetMyTimetable`).subscribe({
      next: (response: ApiResponse) => {
        console.log(response);
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
  
}
