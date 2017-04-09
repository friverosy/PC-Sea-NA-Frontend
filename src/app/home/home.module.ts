import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { PaginatorModule } from "ngx-paginator";
import { FileUploadModule } from 'ng2-file-upload';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    Ng2DatetimePickerModule,    
    HomeRoutingModule,
    PaginatorModule,
    FileUploadModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
