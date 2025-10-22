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
import { ApiService } from '../../services';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module'; // Adjust the path as necessary

interface ApiResponse {
  status: string;
  message: string;
  data: any[];
}

@Component({
  selector: 'app-school',
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
  templateUrl: './school.component.html',
  styleUrl: './school.component.scss'
})
export class SchoolComponent {
  conList: any[] = [];
  searchText: string = '';
  p: number = 1;
  isModalVisible: boolean = false; // Initially set to false
  isEditMode: boolean = false;
  currentCountry: any = {
    name: '',
    address:'' ,
    displayPicture: '',
    themeColour: '',
    subscriptionType: '',
    subscriptionTypeFee: 0,
    website: '',
    email: '',
    mobileNumber: '',
    pinKey: ''
  };
  selectedLogoFile: File | null = null;
  constructor(private apiService: ApiService) {}
  
  refreshData(): void {
    this.apiService.get<ApiResponse>('School/GetAll').subscribe({
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
  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.currentCountry.name);
    formData.append('address', this.currentCountry.address);
    //formData.append('logo', this.selectedLogoFile ?? '');
    if (this.selectedLogoFile) {
      formData.append('logo', this.selectedLogoFile);
    }
    formData.append('themeColour', this.currentCountry.themeColour);
    formData.append('subscriptionType', this.currentCountry.subscriptionType);
    formData.append('subscriptionTypeFee', this.currentCountry.subscriptionTypeFee);
    formData.append('website', this.currentCountry.website);
    formData.append('email', this.currentCountry.email);
    formData.append('mobileNumber', this.currentCountry.mobileNumber);
    formData.append('pinKey', this.currentCountry.pinKey);
    console.log('Form submission successful', formData);

    this.apiService.post<ApiResponse>('School/Add', formData).subscribe({
      next: (response: any) => {
        console.log('Form submission successful', response);
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

  saveCountry() {
    console.log('Save country:', this.currentCountry);
    this.isEditMode = false; 
    this.apiService.post<ApiResponse>('School/Add', this.currentCountry).subscribe({
      next: (response:any) => {
        console.log('School added successful', response);
        
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
    const formData = new FormData();
    formData.append('name', this.currentCountry.name);
    formData.append('address', this.currentCountry.address);
    //formData.append('logo', this.selectedLogoFile ?? '');
    if (this.selectedLogoFile) {
      formData.append('logo', this.selectedLogoFile);
    }
    formData.append('themeColour', this.currentCountry.themeColour);
    formData.append('subscriptionType', this.currentCountry.subscriptionType);
    formData.append('subscriptionTypeFee', this.currentCountry.subscriptionTypeFee);
    formData.append('website', this.currentCountry.website);
    formData.append('email', this.currentCountry.email);
    formData.append('mobileNumber', this.currentCountry.mobileNumber);
    formData.append('pinKey', this.currentCountry.pinKey);
    console.log('Form submission successful', formData);

    this.apiService.put<ApiResponse>(`School/UpdateById/${this.currentCountry.id}`, formData).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          const index = this.conList.findIndex(c => c.id === this.currentCountry.id);
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
  
  // Format date to day month year
  const formattedDate = createdAtDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
    Swal.fire({
      title: 'School Details',
      html: `<strong>School:</strong> ${country.name}
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
        this.apiService.delete<ApiResponse>(`School/DeleteById/${country.id}`).subscribe({
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
  
  // onFileChange(event: any) {
  //   if (event.target.files.length > 0) {
  //     this.selectedLogoFile = event.target.files[0];
  //   }
  // }
  onFileChange(event: any) {
    this.selectedLogoFile = event.target.files[0];
  }
  openModal(): void {
    console.log('Opening modal');
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }
}
