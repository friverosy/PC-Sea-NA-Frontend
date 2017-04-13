import { environment } from '@environments/environment';

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

import { User } from '@core/models/user.model';



@Injectable()
export class AuthService {
    
  constructor(private http: Http, private authHttp: AuthHttp) { }
  
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.API_BASEURL}/auth/local`, {username: username, password: password}, new Headers({ 'Content-Type': 'application/json' }))
                    .map((res: Response) => {
                      let json = res.json();

                      if (!json.fail) {
                        localStorage.setItem("id_token", json.token);
                      }
                      
                      return json.token;
                    });
  }

  destroySession() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('rememberSession');
  }

  logout(): Promise<any> {  
    return new Promise(resolve => {
      this.destroySession();
      
      resolve();
    });
  }
  
  loggedIn() {
    return tokenNotExpired();
  }

  getAccessToken() {
    return localStorage.getItem('id_token');
  }
  
	getProfile(): Observable<User> {
    return this.authHttp.get(`${environment.API_BASEURL}/api/users/me`)
              .map((res: Response) => {
                let json = res.json();
                
                return new User().fromJSON(json);
              })
              .share();
 	}
  
  setRememberMeState(state: boolean) {
    localStorage.setItem('rememberSession', JSON.stringify(state));
  }

  getRememberMeState() {
    return JSON.parse(localStorage.getItem('rememberSession')) || false;
  }
  
}