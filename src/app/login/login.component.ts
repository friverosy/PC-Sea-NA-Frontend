import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { AuthService } from '../api/auth/auth.service';
import { User } from '../api/user/user.model';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  inputs: ['username', 'password']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  invalidLogin: boolean = false;
  serverError: boolean = false;
  
  constructor(private authService: AuthService, private router:Router) { 
  }
  
  ngOnInit() {
    
  }

  login($event, username, password) {
    this.authService.login(username, password)
                    .flatMap(() => this.authService.getProfile())
                    .subscribe((user: User) => {
                      if(!this.authService.loggedIn()) { return; }
                      
                        return this.router.navigate(['/home']); 
                    }, (error) => {
                      this.invalidLogin = false;
                      this.serverError  = false;
                      
                      if (error.status === 401) {
                        console.log('Invalid Username or Password!');
                        this.invalidLogin = true
                      } else if (error.status === 500) {
                        console.log('Server Error while trying to login');
                        this.serverError = true;
                      } else {
                        console.error(`Unknown error while trying to login to API: ${error}`);
                        this.serverError = true;
                      }
                    });
  }

  rememberMeToggle(event) {        
    console.log('remember me clicked!');
  }

}
