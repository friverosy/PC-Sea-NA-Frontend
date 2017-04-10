import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent }      from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { CanActivateAuthGuard } from '@core/auth/auth-guard.service';
import { CurrentUserResolve }   from '@core/services/user/user.providers';

@NgModule({
  imports: [
    RouterModule.forChild([{ 
      path: 'home', 
      component: HomeComponent,
      canActivate: [CanActivateAuthGuard],
      resolve: { currentUser: CurrentUserResolve },
      children: [{
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'prefix'
        }, {
          path: 'dashboard',
          component: DashboardComponent
        }]
    }])
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
