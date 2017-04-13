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
      refId: { title: 'Viaje' },
      itineraryName: { title: 'Ruta' },
      route: { title: 'Zarpe' },
      totalPassengersCount: { title: 'Total Pasajeros' },
      pendingCheckinCount: { title: 'Total Pasajeros' },
      checkinCount: { title: 'Total Pasajeros' },
      onboardCount: { title: 'Compras a bordo' }
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
    
    Observable.forkJoin([
      this.registerService.getRegisters({ itinerary: this.currentItinerary.refId }),
      this.itineraryService.getItineraryManifests(this.currentItinerary._id),
      this.registerService.getRegistersStatus({ itinerary: this.currentItinerary.refId })
    ])
    .subscribe(data => {
      let registers       = data[0];
      let manifests       = data[1];
      let registersStatus = data[2];
      
      console.log(`registers = ${JSON.stringify(registers)}`)
      console.log(`manifests = ${JSON.stringify(manifests)}`)
      console.log(`registersStatus = ${JSON.stringify(registersStatus)}`)
      
      
      // TODO:
      // 1) Listar los atributos que se necesiten en la tabla (de los resultados obtenidos acá (endpoints register + manifests) hay que generar un JSON con los atributos necesarios). 
      // En teoria por lo señalado en NAV-42, los atributos a mostrar son estos:
      //      - personId: register.person._id,
      //      - documentId: register.person.documentId,
      //      - name: register.person.name,
      //      - origin: manifest.origin,
      //      - destination: manifest.destination,
      //      - refId: manifest.itinerary.refId
      // Sin embargo no tiene sentido varios de ellos (pej: refId ya que previamente ya seleccionamos un itinerario con refId en particular. Tambien cada entry de la tabla es imposible que tenga un conteo global dado que es un dato atomico). 
      //En sintesis: Hay que seguir iterando la lista de atributos.
      
      
      // 2) Una vez obtenida la lista con los atributos de interes, calcular estadisticas para llenar los widgets


      // 3) Este es un ejemplo dummy de la construccion de la data para la tabla y los widgets:
      let dummyTableData = [];
      
      for (var i = 0; i < 30; i++) {
        dummyTableData.push({
          refId: 'este dato no tiene sentido!', 
          itineraryName: 'este dato no tiene sentido!',
          route: `ruta dummy ${i}`,
          totalPassengersCount: 'este dato no tiene sentido!',
          pendingCheckinCount: 'este dato no tiene sentido!',
          checkinCount: 'este dato no tiene sentido!',
          onboardCount: 'este dato no tiene sentido!'
        })
      }
 
      this.statistics = {
        totalCount: _.random(1,100),
        checkinCount: _.random(1,100),
        checkoutCount: _.random(1,100),
        onboardSellsCount: _.random(1,100)
      }
      
      this.registerTableDataSource.load(dummyTableData);
    });
  }
  
}