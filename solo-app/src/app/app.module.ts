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
import {NavMenuModule} from "./lib/nav-menu/nav-menu.module";
import {TapeModule} from "./lib/tape/tape.module";

import {SweetAlert2Module} from "@toverux/ngx-sweetalert2";
import {UserModule} from "./lib/user/user.module";
import {CoreService} from "./core.service";
import {PostModule} from "./lib/post/post.module";

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
    TapeModule,
    UserModule,
    PostModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [ AuthService, CookieService, CoreService ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
