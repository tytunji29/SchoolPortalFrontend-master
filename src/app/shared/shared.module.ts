import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [SearchPipe],
  imports: [
    CommonModule,
    NgxPaginationModule,
  ],
  exports: [
    NgxPaginationModule,
    SearchPipe
  ]
})
export class SharedModule { }
