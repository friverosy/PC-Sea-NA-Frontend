import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute }           from '@angular/router';

import { Observable } from 'rxjs/Rx';
import { LocalDataSource } from 'ng2-smart-table';

import { ItineraryService } from '@core/services/itinerary/itinerary.providers';
import { RegisterService } from '@core/services/register/register.providers';
import { SocketService }   from '@core/services/socket/socket.service';

import { Register } from '@core/models/register.model';

import * as _      from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.css']
})
export class RegistersComponent implements OnInit {
  readonly stateHumanizedDict = {
    'pending': 'Pendiente',
    'checkin': 'Checkin',
    'checkout': 'Checkout'
  }
  
  
  // contains the selected date (filter)
  datefilter: any;
  
  // params for itinerary filter
  currentItineraryIdFilter: string;
  currentItinerary: any;
  
  // list of the current itineraries set given the selected date
  itinerariesForSelectedDate: any[] = [];
  
  // widgets data (statistics)
  statistics: any = {
    totalCount: 0,
    checkinCount: 0,
    checkoutCount: 0,
    onboardSellsCount: 0
  }
  
  // table attributes  
  registerTableDataSource: LocalDataSource;
  registerTableSettings = {
    editable: false,
    sort: false,
    paging: true,
    hideHeader: true,
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    noDataMessage: 'No hay registros en el sistema',
    columns: {
      manifestTicketId: { title: 'ID Ticket' },
      reservationId: { title: 'ID Reserva' },
      isOnboard: { title: 'Tipo Venta' },
      state: { title: 'Estado' },
      personName: { title: 'Nombre Pasajero' },
      personNationality: { title: 'Nacionalidad' },
      personDocumentType: { title: 'Tipo Documento' },
      personDocumentId: { title: 'ID Documento' },
      seaportCheckin: { title: 'Puerto Embarque' },
      seaportCheckout: { title: 'Puerto Desmbarque' }
    }
  };
  
  constructor(
    private socketService: SocketService, 
    private registerService: RegisterService,
    private itineraryService: ItineraryService
  ) {
    this.registerTableDataSource = new LocalDataSource();
  }
  
  ngOnInit() {
    this.socketService.get('register')
      .subscribe(registers => this.reloadData());      
  }
  
  setDateFilter(date) {
    this.itineraryService.getItineraries({ date: date })
       .subscribe(itineraries => this.itinerariesForSelectedDate = itineraries);
  }
 
  changeItinerary(itineraryId){
    this.currentItinerary = _.find(this.itinerariesForSelectedDate, { _id: itineraryId });
    this.reloadData();
  }
  
  private reloadData(){
    if (!this.currentItinerary) {
      console.log(`can't reload data due currentItinerary is not set!'`)
      return;
    }
        
    this.itineraryService.getRegisters(this.currentItinerary)
    .subscribe(registers => {
      
      let tableData = registers.map(r => {
        return {
          manifestTicketId: r.manifest.ticketId,
          reservationId: r.manifest.reservationId,
          isOnboard: r.isOnboard ? 'A bordo' : 'Reserva',
          state: this.stateHumanizedDict[r.state],
          
          personName: r.person.name,
          personNationality: r.person.nationality,
          personDocumentType: r.person.documentType,
          personDocumentId: r.person.documentId,
          seaportCheckin: r.seaportCheckin ? r.seaportCheckin.locationName : '-',
          seaportCheckout: r.seaportCheckout ? r.seaportCheckout.locationName : '-'
        }
      })
      
      this.registerTableDataSource.load(tableData);
      
      this.updateStatistics();
    });
    
  }
  
  updateStatistics() {
    // ugly hack to access private attribute.
    let tableData = (<any> this.registerTableDataSource).data;
        
    this.statistics = {
      totalCount: tableData.length,
      checkinCount: _.filter(tableData, { state: 'Checkin' }).length,
      checkoutCount: _.filter(tableData, { state: 'Checkout' }).length,
      onboardSellsCount: _.filter(tableData, { state: 'A bordo' }).length
    }
  }
  
}