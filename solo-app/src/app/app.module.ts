import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";

import { NotFoundComponent } from './not-found/not-found.component';
import {NavbarModule} from "./navbar/navbar.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import { SigninComponent } from './signin/signin.component';
import {AuthService} from "./auth.service";
import {CookieService} from "ngx-cookie-service";
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MzCollapsibleModule} from "ngx-materialize";
import { SignupComponent } from './signup/signup.component';
import {FoodCoinModule} from "./lib/food-coin/food-coin.module";
import {NavMenuModule} from "./lib/nav-menu/nav-menu.module";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    DashboardComponent,
    SigninComponent,
    LandingPageComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NavbarModule,
    MzCollapsibleModule,
    NavMenuModule,
  ],
  providers: [ AuthService, CookieService ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
