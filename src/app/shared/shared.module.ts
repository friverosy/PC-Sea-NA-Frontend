import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TopHeaderComponent } from './top-header/top-header.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { SectionComponent } from './left-sidebar/section/section.component';
import { GroupSectionComponent } from './left-sidebar/group-section/group-section.component';
import { TypeaheadContainerComponent } from './typeahead/typeahead-container.component';
import { ComponentsHelper } from './utils/components-helper.service';
import { NgTranscludeDirective } from './utils/common';

import { TypeaheadDirective } from './typeahead/typeahead.directive';

import { CalendarPipe } from './moment/calendar.pipe';
import { DateFormatPipe } from './moment/date-format.pipe';
import { OrderByPipe } from './utils/order-by.pipe';
import { MapToIterablePipe } from './utils/map-to-iterable.pipe';

@NgModule({
  declarations: [
    LeftSidebarComponent,
    TopHeaderComponent,
    SectionComponent,
    GroupSectionComponent,
    TypeaheadContainerComponent,
    TypeaheadDirective,
    CalendarPipe,
    DateFormatPipe,
    OrderByPipe,
    MapToIterablePipe,
    NgTranscludeDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    LeftSidebarComponent,
    TopHeaderComponent,
    SectionComponent,
    GroupSectionComponent,
    TypeaheadContainerComponent,
    TypeaheadDirective,
    CalendarPipe,
    DateFormatPipe,
    OrderByPipe,
    MapToIterablePipe
  ],
  providers: [
    ComponentsHelper
  ],
  entryComponents: [
    TypeaheadContainerComponent
  ]
})
export class SharedModule { }
