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

const studentsRd = '/teachers/students';
@Component({
  selector: 'app-classes',
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
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent {
conList: any[] = [];
  searchText: string = '';
  p: number = 1;
  isModalVisible: boolean = false; // Initially set to false
  isEditMode: boolean = false;
  classLevels: any[] = [];
  classTeachers: any[] = [];
  currentCountry: any = { name: '',classLevel:'',classTeacher:'' };
  constructor(private router: Router,private apiService: ApiService) {}

  refreshData(): void {
    
    const userId = localStorage.getItem('userId'); 
    this.apiService.get<ApiResponse>(`Classes/GetAllByTeacherId/${userId}`).subscribe({
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
  // getClassLevels() {
  //   this.apiService.get<ApiResponse>('ClassLevel/GetAll').subscribe({
  //     next: (response) => {
  //       console.log(response.data)
  //       this.classLevels = response.data;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching class levels', err);
  //     },
  //   });
  // }
  // getClassTeachers() {
  //   this.apiService.get<ApiResponse>('Staff/GetAllTeacherAndAssist').subscribe({
  //     next: (response) => {
  //       this.classTeachers = response.data;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching class levels', err);
  //     },
  //   });
  // }

  ngOnInit(): void {
    this.refreshData();
    // this.getClassLevels();
    // this.getClassTeachers();
  }
  
  saveCountry() {
    console.log('Save country:', this.currentCountry);
    this.isEditMode = false; 
    const cnValu = `${this.currentCountry.name} ${this.currentCountry.classLevel}`
    const tesa =`${this.currentCountry.classTeacher}`
    const payload = {
      name:cnValu,
      teacher:tesa
    };
    this.apiService.post<ApiResponse>('Classes/Add', payload).subscribe({
      next: (response:any) => {
        console.log('Classes added successful', response);
        
        if(response.status ==='success'){
          Swal.fire({
            title: 'Success!',
            text: `${response.message}`,
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.closeModal();
            this.ngOnInit();
          });
        }else {
          // Handle other responses if necessary
          Swal.fire({
            title: 'Error',
            text: `${response.message}`,
            icon: 'error',
            confirmButtonText: 'Retry'
          });
        }
      },
      error: (err:any) => {
        Swal.fire({
          title: 'Error',
          text: `${err.error.message}`,
          icon: 'error',
          confirmButtonText: 'Retry'
        });
      }
    });
  }

  updateCountry() {
    const payload = {
      name: `${this.currentCountry.name} ${this.currentCountry.classLevel}`,
      teacher:`${this.currentCountry.classTeacher}`
    };
    this.apiService.put<ApiResponse>(`Classes/UpdateById/${this.currentCountry.id}`, payload).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          const index = this.conList.findIndex(c => c.id === this.currentCountry._id);
          if (index !== -1) {
            this.conList[index] = { ...this.currentCountry };
          }
          Swal.fire({
            title: 'Updated!',
            text: `${response.message}`,
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.closeModal();
            this.ngOnInit();
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
          text: `${err.error.message || 'An unexpected error occurred'}`,
          icon: 'error',
          confirmButtonText: 'Retry'
        });
      }
    });
  }
  
  

  viewCountry(country: any) {
    
    this.router.navigate([studentsRd]);
  }
  

  editCountry(country: any) {
    console.log('Edit country:', country); 
    this.currentCountry = { ...country }; // Clone the selected country to avoid direct mutation
    this.isEditMode = true; // Set the modal to edit mode
    this.openModal(); // Open the modal
  }

  deleteCountry(country: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${country.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.apiService.delete<ApiResponse>(`Classes/DeleteById/${country.id}`).subscribe({
          next: () => {
            this.conList = this.conList.filter(c => c.id !== country.id);
            Swal.fire('Deleted!', `${country.name} has been deleted.`, 'success');
            
            this.ngOnInit();
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', `${country.name} is safe.`, 'error');
      }
    });
  }
  
  
  openModal(): void {
    console.log('Opening modal');
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }
}
