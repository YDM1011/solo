import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";

import { NotFoundComponent } from './not-found/not-found.component';
import {NavbarModule} from "./navbar/navbar.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import { SigninComponent } from './signin/signin.component';
import {AuthService} from "./auth.service";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    DashboardComponent,
    SigninComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NavbarModule
  ],
  providers: [AuthService],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
