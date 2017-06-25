import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { RegisterService } from '@core/services/register/register.providers';

import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'viewcell-button',
  template: `
    <button class="btn btn-transparent btn-transparent-success btn-xs" (click)="onClick()"><span class="fa fa-search"></span> {{ renderValue }}</button>
  `,
})
export class ViewCellButtonComponent implements ViewCell, OnInit {
  renderValue: string;
  
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() clicked: EventEmitter<any> = new EventEmitter();

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
    this.renderValue = this.value.toString();
  }

  onClick() {
    this.registerService.registerDetailButtonClicked.next(this.rowData);
    // this.clicked.emit(this.rowData);
  }
}
