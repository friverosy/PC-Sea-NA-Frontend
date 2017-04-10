import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class CanActivateAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {    
    let isLoggedIn = this.auth.loggedIn();

    // If user is not logged in we'll send them to the homepage
    if (isLoggedIn) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}