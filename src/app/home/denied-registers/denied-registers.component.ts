import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
  readonly deniedReasonDict = {
    1: 'Puerto de embarque no corresponde',
    2: 'Puerto de desembarque no corresponde',
    3: 'Pasajero no se encuentra en el manifiesto',
    4: 'Viaje no corresponde',
    5: 'Porfavor configure el manifiesto primero'
  }
  
  // mantain tracking of observable subscriptions
  subscriptions = [];
  
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
      personDocumentId: { title: 'RUT/Pasaporte' },
      seaportCheckin: { title: 'Puerto' },
      date: { title: 'Fecha' },
      reason:  { 
        title: 'Motivo',
        filterFunction: (value: string, search: string) => {
           return search ? value.toString().toLowerCase() === search.toString().toLowerCase() : true;
        },
        filter: {
          type: 'list',
          config: {
            selectText: '- Motivo -',
            list: _.values(this.deniedReasonDict).map(x => { return { value: x, title: x } })
          }
        }  
      },
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
    
    // TODO: Manual subscription lifecycle handling as we are not using async pipe. (refactor this later...)
    
    this.subscriptions.push(
      this.socketService.get('register')
        .subscribe(registers => this.reloadData())
    );

    this.subscriptions.push(
      this.registerTableDataSource.onChanged()
        .subscribe(() => this.updateStatistics())
    );

    this.subscriptions.push(
      this.registerService.currentDateFilter
      .filter(date => !!date)
      .do(date => this.datefilter = date)
      .flatMap(date => this.itineraryService.getItineraries({ date: date }))
      .subscribe(itineraries => this.itinerariesForSelectedDate = itineraries)
    );
      
    this.subscriptions.push(
      this.registerService.currentItineraryFilter
      .filter(itinerary => !!itinerary)
      .do(itinerary => this.currentItineraryIdFilter = itinerary._id)
      .subscribe(() => this.reloadData())
    );
    
    this.subscriptions.push(
      this.socketService.get('register')
        .throttleTime(3000)
        .subscribe(() => this.reloadData())
    );
  }
  
  setDateFilter(date) {
    this.registerService.setCurrentDateFilter(date);
  }
 
  changeItinerary(itineraryId){
    let itinerary = _.find(this.itinerariesForSelectedDate, { _id: itineraryId })
    
    this.registerService.currentItineraryFilter.next(itinerary);
  }
  
  private reloadData(){
    let currentItinerary = this.registerService.currentItineraryFilter.getValue();
    
    if (!currentItinerary) {
      console.log(`can't reload data due currentItinerary is not set!'`)
      return;
    }
        
    this.itineraryService.getRegisters(currentItinerary, { denied: true })
      .subscribe(registers => {
      
        let tableData = registers.map(r => {
        
          let checkinDate  = moment(r.checkinDate);
          let checkoutDate = moment(r.checkoutDate || 0);
        
          return {
            personDocumentId: r.person.documentId,
            personDocumentType: r.person.documentType,
            personName: r.person.name,
            manifestTicketId: r.manifest.ticketId,
            // TODO: define which port will be used for denied registers...
            seaportCheckin: r.seaportCheckin ? r.seaportCheckin.locationName : '-',
            seaportCheckout: r.seaportCheckout ? r.seaportCheckout.locationName : '-',
            date: checkoutDate > checkinDate ? checkoutDate.utc().format('YYYY/MM/DD HH:mm') : checkinDate.utc().format('YYYY/MM/DD HH:mm'),
            reason: this.deniedReasonDict[r.deniedReason]
          }
        });
            
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

  ngOnDestroy() {
    this.subscriptions.map(s => s.unsubscribe());
  }
  
}
