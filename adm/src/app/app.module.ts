import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LayoutComponent } from './layout/layout.component';
import {FormsModule} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "./auth.service";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {ApiInterceptor} from "./api-interceptor";
import { SidebarComponent } from './commponents/sidebar/sidebar.component';
import { CheckBoxComponent } from './pages/check-box/check-box.component';
import { HomeComponent } from './pages/home/home.component';
import { CheckBoxCreateComponent } from './commponents/check-box-create/check-box-create.component';
import { CheckBoxAllComponent } from './commponents/check-box-all/check-box-all.component';
import { CheckBoxEditComponent } from './commponents/check-box-edit/check-box-edit.component';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryAllComponent } from './commponents/category-all/category-all.component';
import { CategoryCreateComponent } from './commponents/category-create/category-create.component';
import { CategoryEditComponent } from './commponents/category-edit/category-edit.component';
import { ModerationComponent } from './pages/moderation/moderation.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    NotFoundComponent,
    LayoutComponent,
    SidebarComponent,
    CheckBoxComponent,
    HomeComponent,
    CheckBoxCreateComponent,
    CheckBoxAllComponent,
    CheckBoxEditComponent,
    CategoryComponent,
    CategoryAllComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    ModerationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,

    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true
  },
    AuthService, CookieService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
