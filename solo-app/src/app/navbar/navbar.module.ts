import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import {AppRoutingModule} from "../app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {FormApiModule} from "../lib/form-api/form-api.module";
import {FormatNumberPipe} from "./format-number.pipe";
import {SearchModule} from "../lib/search/search.module";
import {UserModule} from "../lib/user/user.module";
import {ScrollDirective} from "./scroll.directive";
import {PostModule} from "../lib/post/post.module";
import {PreProductionComponent} from "../lib/pre-production/pre-production.component";
import {BarMenuComponent} from "../lib/bar-menu/bar-menu.component";
import {CreateEstablishmentComponent} from "../lib/create-establishment/create-establishment.component";
import {FormsModule} from '@angular/forms';
import {MobileMenuDirective} from "./mobile-menu.directive";
import {ScrollToDirective} from "./scroll-to.directive";
import { MobileAlertDirective } from './mobile-alert.directive';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormApiModule,
    SearchModule,
    UserModule,
    PostModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    AppRoutingModule,
    PreProductionComponent,
    BarMenuComponent,

  ],
  declarations: [
    NavbarComponent,
    FormatNumberPipe,
    ScrollDirective,
    PreProductionComponent,
    BarMenuComponent,
    CreateEstablishmentComponent,
    MobileMenuDirective,
    ScrollToDirective,
    MobileAlertDirective,
  ]
})
export class NavbarModule { }
