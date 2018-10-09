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
import {SweetAlert2Module} from "@toverux/ngx-sweetalert2";
import {UserModule} from "./lib/user/user.module";
import {CoreService} from "./core.service";
import {PostModule} from "./lib/post/post.module";
import {FormApiModule} from "./lib/form-api/form-api.module";
import {FriendModule} from "./lib/friend/friend.module";
import {UploadModule} from "./lib/upload/upload.module";
import { InitLayoutComponent } from './init-layout/init-layout.component';
import { GalleryComponent } from './lib/gallery/gallery.component';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    DashboardComponent,
    SigninComponent,
    LandingPageComponent,
    SignupComponent,
    InitLayoutComponent,
    GalleryComponent,
    ConfirmComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NavbarModule,
    MzCollapsibleModule,
    UserModule,
    PostModule,
    FormApiModule,
    FriendModule,
    UploadModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [ AuthService, CookieService, CoreService ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
