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
  selector: 'app-country',
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
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})


export class CountryComponent {
  conList: any[] = [];
  searchText: string = '';
  p: number = 1;
  isModalVisible: boolean = false; // Initially set to false
  isEditMode: boolean = false;
  currentCountry: any = { name: '' };
  constructor(private apiService: ApiService) {}
  refreshData(): void {
    this.apiService.get<ApiResponse>('Countrys').subscribe({
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
  
  // Call refreshData() in ngOnInit
  ngOnInit(): void {
    this.refreshData();
  }
  
  saveCountry() {
    console.log('Save country:', this.currentCountry);
    this.isEditMode = false; 
    this.apiService.post<ApiResponse>('Countrys', this.currentCountry).subscribe({
      next: (response:any) => {
        console.log('Countrys added successful', response);
        
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
      name: this.currentCountry.name
    };
    this.apiService.put<ApiResponse>(`Countrys/${this.currentCountry._id}`, payload).subscribe({
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
    const createdAtDate = new Date(country.createdAt);
  
  // Format date to "day month year"
  const formattedDate = createdAtDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
    Swal.fire({
      title: 'Country Details',
      html: `<strong>Country:</strong> ${country.name}
      <br/>
             <strong>CreatedAt:</strong> ${formattedDate} `,
      icon: 'info',
      confirmButtonText: 'Close'
    });
  }
  

  editCountry(country: any) {
    console.log('Edit country:', country); this.currentCountry = { ...country }; // Clone the selected country to avoid direct mutation
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
        this.apiService.delete<ApiResponse>(`Countrys/${country._id}`).subscribe({
          next: () => {
            this.conList = this.conList.filter(c => c.id !== country._id);
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
