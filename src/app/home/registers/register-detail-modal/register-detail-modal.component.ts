import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Rx';

import { BSModalContext }                        from 'angular2-modal/plugins/bootstrap/index';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { Register } from '@core/models/register.model';

export class RegisterDetailModalContext extends BSModalContext {
    constructor(public register: Register) {
      super();
    }
}

@Component({
  selector: 'register-detail-modal',
  templateUrl: './register-detail-modal.component.html',
  styleUrls: ['./register-detail-modal.component.css']
})
export class RegisterDetailModalComponent implements OnInit, ModalComponent<RegisterDetailModalContext> {
  context: RegisterDetailModalContext;
  
  constructor(public dialog: DialogRef<RegisterDetailModalContext>) {
    this.context = dialog.context;
    this.context.showClose = true;
    dialog.setCloseGuard(this);
  }

  ngOnInit() { }

  closeModal() {
    return this.dialog.close();
  }

  onKeyUp(value) {
  }

  beforeDismiss(): boolean {
    return true;
  }

  beforeClose(): boolean {
    return false;
  }

  
}
