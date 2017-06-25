import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { PaginatorModule } from "ngx-paginator";
import { FileUploadModule } from 'ng2-file-upload';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { RegistersComponent } from './registers/registers.component';
import { ViewCellButtonComponent } from './registers/viewcell-button.component';
import { RegisterDetailModalComponent } from './registers/register-detail-modal/register-detail-modal.component';
import { DeniedRegistersComponent } from './denied-registers/denied-registers.component';

@NgModule({
  declarations: [
    HomeComponent,
    RegistersComponent,
    DeniedRegistersComponent,
    ViewCellButtonComponent,
    RegisterDetailModalComponent
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
    FileUploadModule,
    Ng2SmartTableModule
  ],
  exports: [
    HomeComponent
  ],
  entryComponents: [
    ViewCellButtonComponent,
    RegisterDetailModalComponent
  ]
})
export class HomeModule { }
