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
import {ScrollRequestDirective} from "./scroll-request.directive";
import { CreatePostComponent } from './create-post/create-post.component';
import {SearchModule} from "../search/search.module";
import {CreatePostDirective} from "./create-post/create-post.directive";
import {UploadPostComponent} from "./upload-post/upload-post.component";
import {FileMinPostComponent} from "./file-min-post/file-min-post.component";
import { WorkTimeComponent } from './work-time/work-time.component';
import { PopProdEditComponent } from './pop-prod-edit/pop-prod-edit.component';
import {TimepickerModule} from "ngx-bootstrap";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {SafeHTMLPipe} from "../safe-html.pipe";
import { PaymentPipe } from './basket/payment.pipe';
import { StatusPipe } from './basket/status.pipe';
import { OrderPipe } from './basket/order.pipe';
import {BasketHistoryComponent} from "./basket-history/basket-history.component";
import { FormatNumberPipe } from './header/format-number.pipe';
import { TimepickerValidationComponent } from './timepicker-validation/timepicker-validation.component';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    MzSidenavModule,
    FormsModule,
    MzDatepickerModule,
    MzTimepickerModule,
    MzCollapsibleModule,
    MzDropdownModule,
    SearchModule,
    NgbModule,
    TimepickerModule.forRoot(),
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
    BarMenuComponent,
    CreatePostComponent,
    WorkTimeComponent,
    SafeHTMLPipe,
    BasketHistoryComponent
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
    CreateEstablishmentComponent,
    ScrollRequestDirective,
    CreatePostComponent,
    CreatePostDirective,
    UploadPostComponent,
    FileMinPostComponent,
    WorkTimeComponent,
    PopProdEditComponent,
    SafeHTMLPipe,
    PaymentPipe,
    StatusPipe,
    OrderPipe,
    BasketHistoryComponent,
    FormatNumberPipe,
    TimepickerValidationComponent
  ]
})
export class CommponentsModule { }
