import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../api/user/user.model';
import { Sector } from '../api/sector/sector.model';

import { UserService } from '../api/user/user.providers';
import { SocketService } from '../api/socket/socket.service';

import * as moment from 'moment';
import 'moment/min/locales';

declare var Chart:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  
  constructor(private route: ActivatedRoute, private userService: UserService, private socketService: SocketService) { }

  ngOnInit() {    
    this.userService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
     
    // TODO: hardcoded locale
    moment.locale('es-cl');

    Chart.defaults.global.title.fontColor = '#FFFFFF';
    Chart.defaults.global.defaultColor = 'rgba(255, 255, 255, 1)';
    Chart.defaults.global.defaultFontColor = 'rgba(255, 255, 255, 1)';
  }
}
