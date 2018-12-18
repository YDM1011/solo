import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoutingModule } from "./routing/routing.module";
import { PagesModule } from "./pages/pages.module";
import { CommponentsModule } from "./commponents/commponents.module";
import { InitLayoutComponent } from './init-layout/init-layout.component';
import {HttpClientModule} from "@angular/common/http";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ApiInterceptor} from "./api-interceptor";
import {CookieService} from "ngx-cookie-service";
import {ApiService} from "./service/api.service";
import {LeftBarScrollDirective} from "./init-layout/left-bar-scroll.directive";
import {RightBarScrollDirective} from "./init-layout/right-bar-scroll.directive";

@NgModule({
  declarations: [
    AppComponent,
    InitLayoutComponent,
    LeftBarScrollDirective,
    RightBarScrollDirective
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RoutingModule,
    PagesModule,
    CommponentsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true
  },
    CookieService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
