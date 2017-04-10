import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '@core/services/user/user.providers';
import { SocketService } from '@core/services/socket/socket.service';

import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor(private socketService: SocketService, private userService: UserService) { }
  
  ngOnInit() {    
  }
}