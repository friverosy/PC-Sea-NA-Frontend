import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';

import { AppRoutingModule } from './app-routing.module';

import { USER_PROVIDERS } from './api/user/user.providers';
import { COMPANY_PROVIDERS } from './api/company/company.providers';
import { SECTOR_PROVIDERS } from './api/sector/sector.providers';
import { REGISTER_PROVIDERS } from './api/register/register.providers';
import { PERSON_PROVIDERS } from './api/person/person.providers';

import { CanActivateAuthGuard } from './api/auth/auth-guard.service';
import { AuthService } from './api/auth/auth.service';
import { SocketService } from './api/socket/socket.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

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
      useFactory: (http: Http, options: RequestOptions) => {
        return new AuthHttp(new AuthConfig({}), http, options);
      },
      deps: [ Http, RequestOptions ]
    },
    AuthService,
    SocketService,
    USER_PROVIDERS,
    COMPANY_PROVIDERS,
    SECTOR_PROVIDERS,
    REGISTER_PROVIDERS,
    PERSON_PROVIDERS,
    CanActivateAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
