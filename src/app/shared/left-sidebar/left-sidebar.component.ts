import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { UserService } from '@core/services/user/user.providers';
import { User } from '@core/models/user.model';

import * as _ from 'lodash';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {
  currentUser: Observable<User>;
   
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.userService.currentUser;
  }
}