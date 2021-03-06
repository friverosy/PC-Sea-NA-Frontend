import { environment } from '@environments/environment';

import { Injectable, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';

import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';

import { Register } from '@core/models/register.model';

//-------------------------------------------------------
//                      Services
//-------------------------------------------------------

@Injectable()
export class RegisterService {
  currentDateFilter: BehaviorSubject<Date> = new BehaviorSubject(null);
  currentItineraryFilter: BehaviorSubject<any> = new BehaviorSubject(null);
  
  registerDetailButtonClicked = new Subject();
  
  constructor(private authHttp: AuthHttp) { }
    
  getRegisters(query?: any) {
    let queryString = Object.keys(query).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(query[k])}`).join('&');
    
    return this.authHttp.get(`${environment.API_BASEURL}/api/registers${queryString ? `?${queryString}` : ''}`)
      .map(res => <Register[]> res.json())
      .catch(this.handleError);
  }
  
  getRegistersStatus(query?: any){
    let queryString = Object.keys(query).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(query[k])}`).join('&');
    
    return this.authHttp.get(`${environment.API_BASEURL}/api/registers/status${queryString ? `?${queryString}` : ''}`)
      .map(res => <Register[]> res.json())
      .catch(this.handleError);    
  }
  
  setCurrentDateFilter(date: Date) {
    this.currentDateFilter.next(date);
  }
  
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  } 

}

//-------------------------------------------------------
//                      Providers
//-------------------------------------------------------

export const REGISTER_PROVIDERS: Provider[] = [
  { provide: RegisterService, useClass: RegisterService }
];