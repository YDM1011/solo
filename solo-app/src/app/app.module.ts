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
import { PrevAvatarComponent } from './lib/prev-avatar/prev-avatar.component';
import { PrevBgComponent } from './lib/prev-bg/prev-bg.component';
import { LikeEstComponent } from './lib/like-est/like-est.component';
import { LikeDishComponent } from './lib/like-dish/like-dish.component';
import { GeoComponent } from './lib/geo/geo.component';
import { MapComponent } from './lib/map/map.component';
import { PrevDishComponent } from './lib/prev-dish/prev-dish.component';
import {NgxHmCarouselModule} from "ngx-hm-carousel";
import { FriendOfferPageComponent } from './friend-offer-page/friend-offer-page.component';
import { ScrollRequestDirective } from './scroll-request.directive';
import { MarkerClusterDemoComponent } from './lib/marker-cluster-demo/marker-cluster-demo.component';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {LeafletMarkerClusterModule} from "../leaflet-markercluster/leaflet-markercluster.module";
import { RightBarComponent } from './lib/right-bar/right-bar.component';
import { LeftBarComponent } from './lib/left-bar/left-bar.component';
import { LikeDishPageComponent } from './like-dish-page/like-dish-page.component';
import { LikeEstPageComponent } from './like-est-page/like-est-page.component';
import { Top100PageComponent } from './top100-page/top100-page.component';
import {DeviceDetectorModule} from "ngx-device-detector";


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
    FriendOfferPageComponent,
    ScrollRequestDirective,
    MarkerClusterDemoComponent,
    RightBarComponent,
    LeftBarComponent,
    LikeDishPageComponent,
    LikeEstPageComponent,
    Top100PageComponent,
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
    SweetAlert2Module.forRoot(),
    LeafletModule,
    LeafletMarkerClusterModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [ AuthService, CookieService, CoreService],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
