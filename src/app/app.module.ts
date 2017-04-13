import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { SharedModule } from '@app/shared/shared.module';
import { HomeModule } from '@app/home/home.module';

import { AppRoutingModule } from '@app/app-routing.module';

import { USER_PROVIDERS }      from '@core/services/user/user.providers';
import { REGISTER_PROVIDERS }  from '@core/services/register/register.providers';
import { ITINERARY_PROVIDERS } from '@core/services/itinerary/itinerary.providers';

import { CanActivateAuthGuard } from '@core/auth/auth-guard.service';
import { AuthService } from '@core/auth/auth.service';
import { SocketService } from '@core/services/socket/socket.service';

import { AppComponent } from '@app/app.component';
import { LoginComponent } from '@app/login/login.component';


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HomeModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    },
    AuthService,
    CanActivateAuthGuard,
    SocketService,
    REGISTER_PROVIDERS,
    ITINERARY_PROVIDERS,
    USER_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }