import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/home/dashboard',  pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'home', component: HomeComponent },
      { path: '**', redirectTo: '/login' }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}