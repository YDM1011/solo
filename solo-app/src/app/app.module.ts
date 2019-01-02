import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';

import { NotFoundComponent } from './not-found/not-found.component';
import {NavbarModule} from './navbar/navbar.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SigninComponent } from './signin/signin.component';
import {AuthService} from './auth.service';
import {CookieService} from 'ngx-cookie-service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MzCollapsibleModule} from 'ngx-materialize';
import { SignupComponent } from './signup/signup.component';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import {UserModule} from './lib/user/user.module';
import {CoreService} from './core.service';
import {PostModule} from './lib/post/post.module';
import {FormApiModule} from './lib/form-api/form-api.module';
import {FriendModule} from './lib/friend/friend.module';
import {UploadModule} from './lib/upload/upload.module';
import { InitLayoutComponent } from './init-layout/init-layout.component';
import { GalleryComponent } from './lib/gallery/gallery.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { CreateEstablishmentComponent } from './lib/create-establishment/create-establishment.component';
import {IsMyProfileModule} from './lib/is-my-profile/is-my-profile.module';
import { LeftBarScrollDirective } from './dashboard/left-bar-scroll.directive';
import { RightBarScrollDirective } from './dashboard/right-bar-scroll.directive';
import { NewsListComponent } from './lib/news-list/news-list.component';
import {BasketComponent} from './basket/basket.component';
import { ToOrderComponent } from './basket/to-order/to-order.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileInfoComponent } from './profile/profile-info/profile-info.component';


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
    CreateEstablishmentComponent,
    LeftBarScrollDirective,
    RightBarScrollDirective,
    NewsListComponent,
    BasketComponent,
    ToOrderComponent,
    ProfileComponent,
    ProfileInfoComponent,
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
    IsMyProfileModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [ AuthService, CookieService, CoreService ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
