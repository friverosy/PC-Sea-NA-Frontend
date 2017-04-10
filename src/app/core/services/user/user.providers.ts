import { environment } from '@environments/environment';

import { Injectable, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';

import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { AuthService } from '@core/auth/auth.service';

import { User }    from '@core/models/user.model';

//-------------------------------------------------------
//                      Services
//-------------------------------------------------------

@Injectable()
export class UserService {  
  currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  
  constructor(private authHttp: AuthHttp) { }
  
  setCurrentUser(user: User) {
    this.currentUser.next(user);
  }
        
  get(query: Object = {}) {
     let queryString = Object.keys(query).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(query[k])}`).join('&');
    
    return this.authHttp.get(`${environment.API_BASEURL}/api/users${queryString ? '?' + queryString : ''}`)
                        .map(res => <User[]> res.json())
                        .catch(this.handleError);
  }
  
  deleteUser(user: User){
    return this.authHttp.delete(`${environment.API_BASEURL}/api/users/${user._id}`)
                        .catch(this.handleError);
  }
  
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  } 

}

//-------------------------------------------------------
//                      Resolvers
//-------------------------------------------------------


@Injectable()
export class CurrentUserResolve implements Resolve<User> {
  constructor(private router: Router, private authService: AuthService, private userService: UserService) {}

  // before rendering anything, some Subjects are defined: currentUser, currentCompany, currentSector
  resolve(route: ActivatedRouteSnapshot) {
    return this.authService.getProfile()
                           .do(currentUser => this.userService.setCurrentUser(currentUser))
                           .catch((response:Response) => {
                              // TODO: remove redirect from service (create a shared component for error page)
                              this.router.navigate(['/500']);
                              return Observable.empty();
                           });
  }
}


//-------------------------------------------------------
//                      Providers
//-------------------------------------------------------

export const USER_PROVIDERS: Provider[] = [
  { provide: UserService, useClass: UserService },
  { provide: CurrentUserResolve, useClass: CurrentUserResolve }
];