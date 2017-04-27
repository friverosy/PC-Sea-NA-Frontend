import { environment } from '@environments/environment';

import { Injectable, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';

import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { Itinerary } from '@core/models/itinerary.model';
import { Manifest }  from '@core/models/manifest.model';
import { Register }  from '@core/models/register.model';
import { Seaport }   from '@core/models/seaport.model';


//-------------------------------------------------------
//                      Services
//-------------------------------------------------------

@Injectable()
export class ItineraryService {  
  constructor(private authHttp: AuthHttp) { }
  
  getItineraries(query?: any) {    
    let queryString = Object.keys(query).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(query[k])}`).join('&');
    
    return this.authHttp.get(`${environment.API_BASEURL}/api/itineraries${queryString ? `?${queryString}` : ''}`)
                        .map(res => <Itinerary[]> res.json())
                        .catch(this.handleError);
  }
  
  
  getItineraryManifests(itineraryId: string) {    
    return this.authHttp.get(`${environment.API_BASEURL}/api/manifests?itinerary=${itineraryId}`)
                    .map(res => <Manifest[]> res.json())
                    .catch(this.handleError);
  }


  getRegisters(itinerary: Itinerary, query?: any) {
    let queryString = Object.keys(query).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(query[k])}`).join('&');
    
    return this.authHttp.get(`${environment.API_BASEURL}/api/itineraries/${itinerary._id}/registers${queryString ? `?${queryString}` : ''}`)
                    .map(res => <Register[]> res.json())
                    .catch(this.handleError);  
  }


  getSeaports(itinerary: Itinerary) {
    return this.authHttp.get(`${environment.API_BASEURL}/api/itineraries/${itinerary._id}/seaports`)
                    .map(res => <Seaport[]> res.json())
                    .catch(this.handleError);
  }
  
/*  getItineraryStatistics(itineraryId: string) {
    return this.authHttp.get(`${environment.API_BASEURL}/api/itineraries/${itineraryId}/statistics`)
                    .map(res => res.json())
                    .catch(this.handleError);
  }
*/  
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  } 

}

//-------------------------------------------------------
//                      Providers
//-------------------------------------------------------

export const ITINERARY_PROVIDERS: Provider[] = [
  { provide: ItineraryService, useClass: ItineraryService }
];