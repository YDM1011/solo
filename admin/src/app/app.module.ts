import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InitLayoutComponent } from './init-layout/init-layout.component';
import { RoutingModule } from "./routing/routing.module";
import { CommponentsModule } from "./commponents/commponents.module";
import { PagesModule } from "./pages/pages.module";
import { ApiInterceptor } from "./api-interceptor";
import { ApiService } from "./api.service";
import { HttpClientModule } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { FormsModule } from "@angular/forms";
import {ApiEventService} from "./service/api-event.service";

@NgModule({
  declarations: [
    AppComponent,
    InitLayoutComponent,
  ],
  imports: [
    BrowserModule,
    PagesModule,
    FormsModule,
    CommponentsModule,
    RoutingModule,
    HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    ApiService,
    CookieService,
    ApiEventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
