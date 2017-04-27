import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent }            from './home.component';
import { RegistersComponent }       from './registers/registers.component';
import { DeniedRegistersComponent } from './denied-registers/denied-registers.component';

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
          redirectTo: 'registers',
          pathMatch: 'prefix'
        }, {
          path: 'registers',
          component: RegistersComponent
        }, {
          path: 'denied-registers',
          component: DeniedRegistersComponent
        }]
    }])
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
