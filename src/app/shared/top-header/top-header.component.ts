import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';

declare var $: any;

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html'
})
export class TopHeaderComponent implements OnInit {
  @Input() title: string = "";
  
  splittedTitle: string[];
  
  constructor(private router: Router, private authService: AuthService) {
    
  }

  ngOnInit() {    
    // only get first 2 words from CamelCase'd title    
    this.splittedTitle = this.title.replace(/([A-Z])/g, ' $1').split(" ").slice(1,3);
    while(this.splittedTitle.length < 2 ) this.splittedTitle.push("");
  }

  logout() {
    this.authService.logout().then(() => this.router.navigate(['/login']))
  }

  toggleSidebar() {
    if ($(window).width() < 769) {
        $('body').toggleClass('sidebar-open-sm');
    } else {
        $('body').toggleClass('sidebar-closed-md');
    }
  }
}
