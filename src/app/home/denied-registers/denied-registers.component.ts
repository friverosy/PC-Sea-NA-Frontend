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
  selector: 'denied-registers',
  templateUrl: './denied-registers.component.html',
  styleUrls: ['./denied-registers.component.css']
})
export class DeniedRegistersComponent implements OnInit {
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
    hideHeader: false,
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    noDataMessage: 'Sin resultados',
    columns: {
      personDocumentId: { title: 'ID Documento' },
      personDocumentType: { title: 'Tipo Documento'  },
      personName: { title: 'Nombre Pasajero' },
      manifestTicketId: { title: 'ID Ticket' },
      seaport: { title: 'Puerto' },
      date: { title: 'Fecha' },
      reason: { title: 'Motivo' }
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
      
    this.registerTableDataSource.onChanged().subscribe(() => this.updateStatistics())
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
        
    this.itineraryService.getRegisters(this.currentItinerary, { denied: true })
    .subscribe(registers => {
      
      let tableData = registers.map(r => {
        return {
          personDocumentId: r.person.documentId,
          personDocumentType: r.person.documentType,
          personName: r.person.name,
          manifestTicketId: r.manifest.ticketId,
          state: this.stateHumanizedDict[r.state],
          seaport: r.seaport ? r.seaport.locationName : '-',
          date: r.date ? moment(r.date).format('YYYY/MM/DD HH:MM') : '-'
        }
      })
      
      this.registerTableDataSource.load(tableData);
      
      this.updateStatistics();
    });
    
  }
  
  updateStatistics() {
    // ugly hack to access private attribute.
    let tableData = (<any> this.registerTableDataSource).filteredAndSorted;
        
    this.statistics = {
      totalCount: tableData.length,
      checkinCount: _.filter(tableData, { state: 'Checkin' }).length,
      checkoutCount: _.filter(tableData, { state: 'Checkout' }).length,
      onboardSellsCount: _.filter(tableData, { state: 'A bordo' }).length
    }
  }
  
  registerQuery(query: any[]) {
    this.registerTableDataSource.setFilter(query, false); 
  }
  
}