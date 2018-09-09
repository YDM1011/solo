import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import {AppRoutingModule} from "../app-routing.module";
import {MzButtonModule, MzInputModule, MzSpinnerModule, MzNavbarModule, MzBadgeModule, MzSidenavModule, MzDropdownModule} from "ngx-materialize";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import { AsaidbarComponent } from './asaidbar/asaidbar.component';

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
    MzBadgeModule,
    MzDropdownModule
  ],
  exports: [NavbarComponent, AppRoutingModule],
  declarations: [NavbarComponent, AsaidbarComponent]
})
export class NavbarModule { }
