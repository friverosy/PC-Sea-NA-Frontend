import { Component, HostListener } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  
  constructor(private authService: AuthService) { }
  
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    if(!this.authService.getRememberMeState()) { 
      return this.authService.destroySession(); 
    }
  }
}
