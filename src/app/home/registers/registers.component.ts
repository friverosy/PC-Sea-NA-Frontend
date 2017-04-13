import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '@core/services/user/user.providers';
import { SocketService } from '@core/services/socket/socket.service';

import { Register } from '@core/models/register.model';

import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.css']
})
export class RegistersComponent implements OnInit {
  
  datefilter: any;
  currentItineraryFilter: string;
  registers: any[] = [];
  
  settings = {
    editable: false,
    sort: false,
    hideHeader: true,
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    noDataMessage: 'No hay registros en el sistema',
    columns: {
      refId: { title: 'Viaje', class: '.h4' },
      itineraryName: { title: 'Ruta' },
      route: { title: 'Zarpe' },
      totalPassengersCount: { title: 'Total Pasajeros' },
      pendingCheckinCount: { title: 'Total Pasajeros' },
      checkinCount: { title: 'Total Pasajeros' },
      onboardCount: { title: 'Compras a bordo' }
    }
  };
  
  
  constructor(private socketService: SocketService, private userService: UserService) { }
  
  ngOnInit() {
    for (var i = 0; i < 20; i++) {
      this.registers.push({
            refId: 1,
            itineraryName: 'asdasd',
            route: 'asdasd',
            totalPassengersCount: 'asdasd',
            pendingCheckinCount: 'asdasd',
            checkinCount: 'asdasd',
            onboardCount: 'asdasda'
      });
    }
    
    // this.registers = []
  }
  
  setDateFilter(event) {
    
  }
  
  changeItineraryFilter(itinerary) {
    
  }
}