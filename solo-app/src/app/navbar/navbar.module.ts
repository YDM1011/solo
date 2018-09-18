import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import {AppRoutingModule} from "../app-routing.module";
import {MzButtonModule, MzInputModule, MzSpinnerModule, MzNavbarModule, MzSidenavModule} from "ngx-materialize";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import { AsaidbarComponent } from './asaidbar/asaidbar.component';
import {FormApiModule} from "../lib/form-api/form-api.module";

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
    FormApiModule
  ],
  exports: [NavbarComponent, AppRoutingModule],
  declarations: [NavbarComponent, AsaidbarComponent]
})
export class NavbarModule { }
