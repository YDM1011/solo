import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgComponent } from './img/img.component';
import { HeaderComponent } from './header/header.component';
import {
  MzCollapsibleModule,
  MzDatepickerModule,
  MzDropdownModule,
  MzSidenavModule,
  MzTimepickerModule
} from "ngx-materialize";
import {RoutingModule} from "../routing/routing.module";
import { PostsComponent } from './posts/posts.component';
import { MenuComponent } from './menu/menu.component';
import { EstsComponent } from './ests/ests.component';
import { CustomResComponent } from './custom-res/custom-res.component';
import { DishComponent } from './dish/dish.component';
import { InfoComponent } from './info/info.component';
import { FavoritComponent } from './favorit/favorit.component';
import { MapComponent } from './map/map.component';
import { BasketComponent } from './basket/basket.component';
import {ScrollDirective} from "./header/scroll.directive";
import { PopProdAddComponent } from './pop-prod-add/pop-prod-add.component';
import {FormsModule} from "@angular/forms";
import { ToOrderComponent } from './to-order/to-order.component';
import { PrevAvComponent } from './prev-av/prev-av.component';
import { PrevBgComponent } from './prev-bg/prev-bg.component';
import { PrevDishComponent } from './prev-dish/prev-dish.component';
import { PrevEstComponent } from './prev-est/prev-est.component';
import { ActionComponent } from './action/action.component';
import {SearchPipe} from "./header/search.pipe";
import { NumberPhonePipe } from './number-phone.pipe';
import { PreProductionComponent } from './pre-production/pre-production.component';
import { BarMenuComponent } from './bar-menu/bar-menu.component';
import {ScrollToDirective} from "../scroll-to.directive";
import {MobileMenuDirective} from "./header/mobile-menu.directive";
import { CreateEstablishmentComponent } from './create-establishment/create-establishment.component';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    MzSidenavModule,
    FormsModule,
    MzDatepickerModule,
    MzTimepickerModule,
    MzCollapsibleModule,
    MzDropdownModule
  ],
  exports: [
    ImgComponent,
    HeaderComponent,
    PostsComponent,
    MenuComponent,
    EstsComponent,
    CustomResComponent,
    DishComponent,
    InfoComponent,
    FavoritComponent,
    MapComponent,
    BasketComponent,
    PrevAvComponent,
    PrevBgComponent,
    PrevDishComponent,
    PrevEstComponent,
    ActionComponent,
    NumberPhonePipe,
    PreProductionComponent,
    BarMenuComponent
  ],
  declarations: [
    ImgComponent,
    HeaderComponent,
    PostsComponent,
    MenuComponent,
    EstsComponent,
    CustomResComponent,
    DishComponent,
    InfoComponent,
    FavoritComponent,
    MapComponent,
    BasketComponent,
    ScrollDirective,
    PopProdAddComponent,
    ToOrderComponent,
    PrevAvComponent,
    PrevBgComponent,
    PrevDishComponent,
    PrevEstComponent,
    ActionComponent,
    SearchPipe,
    NumberPhonePipe,
    PreProductionComponent,
    BarMenuComponent,
    ScrollToDirective,
    MobileMenuDirective,
    CreateEstablishmentComponent
  ]
})
export class CommponentsModule { }
