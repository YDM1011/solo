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
import {MzCollapsibleModule, MzTimepickerModule, MzDatepickerModule, MzSelectModule } from 'ngx-materialize';
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
import { HomePageComponent } from './home-page/home-page.component';
import { FriendPageComponent } from './friend-page/friend-page.component';
import { GaleryPageComponent } from './galery-page/galery-page.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { PrevAvatarComponent } from './lib/prev-avatar/prev-avatar.component';
import { PrevBgComponent } from './lib/prev-bg/prev-bg.component';
import { LikeEstComponent } from './lib/like-est/like-est.component';
import { LikeDishComponent } from './lib/like-dish/like-dish.component';
import { GeoComponent } from './lib/geo/geo.component';
import { MapComponent } from './lib/map/map.component';
import { PrevDishComponent } from './lib/prev-dish/prev-dish.component';
import 'hammerjs';
import {NgxHmCarouselModule} from "ngx-hm-carousel";

export class NgbDateMomentParserFormatter extends NgbDateParserFormatter {
  constructor(private momentFormat: string) {
    super();
  };
  format(date: NgbDateStruct): string {
    if (date === null) {
      return '';
    }
    let d = moment({ year: date.year,
      month: date.month - 1,
      date: date.day });
    return d.isValid() ? d.format(this.momentFormat) : '';
  }

  parse(value: string): NgbDateStruct {
    if (!value) {
      return null;
    }
    let d = moment(value, this.momentFormat);
    return d.isValid() ? { year: d.year(),
      month: d.month() + 1,
      day: d.date() } : null;
  }
}

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
    LeftBarScrollDirective,
    RightBarScrollDirective,
    NewsListComponent,
    BasketComponent,
    ToOrderComponent,
    ProfileComponent,
    ProfileInfoComponent,
    HomePageComponent,
    FriendPageComponent,
    GaleryPageComponent,
    PrevAvatarComponent,
    PrevBgComponent,
    LikeEstComponent,
    LikeDishComponent,
    GeoComponent,
    MapComponent,
    PrevDishComponent,
  ],
  exports:[
    PrevAvatarComponent,
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
    MzSelectModule,
    MzDatepickerModule,
    MzTimepickerModule,
    NgbModule,
    NavbarModule,
    NgxHmCarouselModule,
    SweetAlert2Module.forRoot()
  ],
    providers: [ AuthService, CookieService, CoreService,
    {
      provide: NgbDateParserFormatter,
      useFactory: () => { return new NgbDateMomentParserFormatter("DD.MM.YYYY") }
    } ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
