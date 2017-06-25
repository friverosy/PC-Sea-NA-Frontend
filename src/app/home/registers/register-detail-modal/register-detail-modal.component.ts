import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Rx';

import { BSModalContext }                        from 'angular2-modal/plugins/bootstrap/index';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';

@Component({
  selector: 'register-detail-modal',
  templateUrl: './register-detail-modal.component.html',
  styleUrls: ['./register-detail-modal.component.css']
})
export class RegisterDetailModalComponent implements OnInit, ModalComponent<BSModalContext> {
  context: BSModalContext;
  
  
  constructor(public dialog: DialogRef<BSModalContext>) {
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
