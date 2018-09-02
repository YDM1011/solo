import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import {AppRoutingModule} from "../app-routing.module";
import {MzButtonModule, MzInputModule, MzSpinnerModule, MzNavbarModule, MzSidenavModule} from "ngx-materialize";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    MzButtonModule,
    MzInputModule,
    MzSpinnerModule,
    BrowserAnimationsModule,
    MzNavbarModule,
    MzSidenavModule,
    HttpClientModule,
  ],
  exports: [NavbarComponent, AppRoutingModule],
  declarations: [NavbarComponent]
})
export class NavbarModule { }
