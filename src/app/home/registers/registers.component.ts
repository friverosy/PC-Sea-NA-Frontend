import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute }           from '@angular/router';

import { Observable } from 'rxjs/Rx';
import { LocalDataSource } from 'ng2-smart-table';

import { ItineraryService } from '@core/services/itinerary/itinerary.providers';
import { RegisterService } from '@core/services/register/register.providers';
import { SocketService }   from '@core/services/socket/socket.service';

import { Register } from '@core/models/register.model';
import { Itinerary } from '@core/models/itinerary.model';

import * as _         from 'lodash';
import * as moment    from 'moment';
import * as fileSaver from 'file-saver';


@Component({
  selector: 'registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.css']
})
export class RegistersComponent implements OnInit {
  readonly stateHumanizedDict = {
    'pending': 'Pendiente',
    'checkin': 'Embarcado',
    'checkout': 'Desembarcado'
  }
  
  // mantain tracking of observable subscriptions
  subscriptions = [];
  
  // contains the selected date (filter)
  datefilter: any;
  
  // params for itinerary filter
  currentItinerary: Itinerary;
  currentItineraryIdFilter: string;
  
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
      personName: { title: 'Nombre Pasajero' },
      manifestTicketId: { title: 'Boleto' },
      state:  { 
        title: 'Estado',
        filterFunction: (value: string, search: string) => {
           return search ? value.toString().toLowerCase() === search.toString().toLowerCase() : true;
        },
        filter: {
          type: 'list',
          config: {
            selectText: '- Estado -',
            list: [
              { value: 'Pendiente', title: 'Pendiente' },
              { value: 'Embarcado', title: 'Embarcado' },
              { value: 'Desembarcado', title: 'Desembarcado' }
            ]
          }
        }  
      },
      origin: { title: 'Origen' },
      destination: { title: 'Destino' },
      checkinDate: { title: 'Fecha Embarque' },
      checkoutDate: { title: 'Fecha Desembarque' }
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
        .do(itinerary => this.currentItinerary = itinerary)
        .subscribe(() => this.reloadData())      
    );
    
    this.subscriptions.push(
      this.socketService.get('register')
        .debounceTime(3000)
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
    // TODO: seems to not be necessary now... (remove it when possible)
    if (!this.currentItinerary) {
      console.log(`can't reload data due currentItinerary is not set!'`)
      return;
    }
        
    this.itineraryService.getRegisters(this.currentItinerary, { denied: false })
      .subscribe(registers => {
      
        let tableData = registers.map(r => {
          return {
            personDocumentId: r.person.documentId,
            personName: r.person.name,
            state: this.stateHumanizedDict[r.state],
            manifestTicketId: r.manifest.ticketId,
            origin: r.manifest.origin ? r.manifest.origin.locationName : '-',
            destination: r.manifest.destination ? r.manifest.destination.locationName : '-',
            checkinDate: r.checkinDate ? moment(r.checkinDate).utc().format('YYYY/MM/DD HH:mm') : '-',
            checkoutDate: r.checkoutDate ? moment(r.checkoutDate).utc().format('YYYY/MM/DD HH:mm') : '-',
            isOnboard: r.isOnboard
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
      checkinCount: _.filter(tableData, { state: 'Embarcado' }).length,
      checkoutCount: _.filter(tableData, { state: 'Desembarcado' }).length,
      onboardSellsCount: _.filter(tableData, { isOnboard: true }).length
    }
  }
  
  registerQuery(query: any[]) {
    this.registerTableDataSource.setFilter(query, false); 
  }
  
  exportExcel(query: any = {}) {        
    this.itineraryService.exportExcel(this.currentItinerary, query)
      .subscribe(data  => fileSaver.saveAs(data, 'registers-export.xlsx'),
                 error => console.log("Error downloading the file."),
                 ()    => console.log('Completed file download.'));
  }
  
  ngOnDestroy() {
    this.subscriptions.map(s => s.unsubscribe());
  }  
}
