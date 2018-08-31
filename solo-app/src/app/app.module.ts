import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MzButtonModule, MzInputModule, MzSpinnerModule, MzNavbarModule, MzSidenavModule} from "ngx-materialize";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MzButtonModule,
    MzInputModule,
    MzSpinnerModule,
    BrowserAnimationsModule,
    MzNavbarModule,
    MzSidenavModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
