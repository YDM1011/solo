import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import {AppRoutingModule} from "../app-routing.module";
import {MzSpinnerModule, MzSidenavModule} from "ngx-materialize";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import { AsaidbarComponent } from './asaidbar/asaidbar.component';
import {FormApiModule} from "../lib/form-api/form-api.module";
import {FormatNumberPipe} from "./format-number.pipe";
import {SearchModule} from "../lib/search/search.module";

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MzSidenavModule,
    HttpClientModule,
    FormApiModule,
    SearchModule
  ],
  exports: [NavbarComponent, AppRoutingModule],
  declarations: [NavbarComponent, AsaidbarComponent, FormatNumberPipe]
})
export class NavbarModule { }
