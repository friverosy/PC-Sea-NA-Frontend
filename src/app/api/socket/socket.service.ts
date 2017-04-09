import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs/Rx';

import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private socket: any;
  
  constructor(private authService: AuthService) {
    let token: string = authService.getAccessToken();
    
    if(!token) { return; }
    
    this.socket = io(environment.API_BASEURL, {
      query: 'token=' + token,
      path: '/socket.io-client'
    });
    
    this.socket.on("connect", () => {
      console.log(`[Socket.io] Connected to ${environment.API_BASEURL}`);
    });
    
    this.socket.on("disconnect", () => {
      console.log(`[Socket.io] Disconnected to ${environment.API_BASEURL}`);
    });
    
    this.socket.on("error", (error: string) => {
      console.log(`[Socket.io] Error: ${error}`);
    });      
  }

  get(modelName: string): Observable<any> {
    return Observable.create((observer: any) => {
      this.socket.on(`${modelName}:save`, (item: any) => observer.next({ action: "save", item: item }) );
      this.socket.on(`${modelName}:remove`, (item: any) => observer.next({ action: "remove", item: item }) );
      this.socket.on(`${modelName}:update`, (item: any) => observer.next({ action: "update", item: item }) );
      return () => this.socket.close();
    });
  }
}
