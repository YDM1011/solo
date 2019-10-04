import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import {CommponentsModule} from "../commponents/commponents.module";
import {ApiService} from "../api.service";
import { SettingComponent } from './setting/setting.component';
import {FormsModule} from "@angular/forms";
import { ChainComponent } from './chain/chain.component';
import { EstablishmentsComponent } from './establishments/establishments.component';
import { WorkTimeComponent } from './work-time/work-time.component';
import { DishComponent } from './dish/dish.component';
import { CategoryComponent } from './category/category.component';
import { CategoryGlobalComponent } from './category-global/category-global.component';
import { ComplementComponent } from './complement/complement.component';
import { BoxComponent } from './box/box.component';
import { OrderComponent } from './order/order.component';
import { OrderDeliveryComponent } from './order-delivery/order-delivery.component';
import { OrderSelfComponent } from './order-self/order-self.component';
import { OrderReservationComponent } from './order-reservation/order-reservation.component';
import {RoutingModule} from "../routing/routing.module";
import { EstCreateComponent } from './est-create/est-create.component';
import { EstEditComponent } from './est-edit/est-edit.component';
import { DishCreateComponent } from './dish-create/dish-create.component';
import { DishEditComponent } from './dish-edit/dish-edit.component';
import {CategoryCreateComponent} from "./category-create/category-create.component";
import {CategoryEditComponent} from "./category-edit/category-edit.component";
import { ComplementCreateComponent } from './complement-create/complement-create.component';
import { ComplementEditComponent } from './complement-edit/complement-edit.component';
import { BoxEditComponent } from './box-edit/box-edit.component';
import { BoxCreateComponent } from './box-create/box-create.component';
import { MenuCreateComponent } from './menu-create/menu-create.component';
import { MenuEditComponent } from './menu-edit/menu-edit.component';
import { ActionComponent } from './action/action.component';
import { HelpComponent } from './help/help.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderDetailEditComponent } from './order-detail-edit/order-detail-edit.component';
import { PaymentPipe } from './order-detail/payment.pipe';
import { StatusPipe } from './order/status.pipe';
import {SafeHTMLPipe} from "../safe-html.pipe";
import { OrderPipe } from './order-detail/order.pipe';
import { BalansComponent } from './balans/balans.component';
import { OverviewComponent } from './overview/overview.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { PromoComponent } from './promo/promo.component';
import { PromoCreateComponent } from './promo-create/promo-create.component';
import { PromoEditComponent } from './promo-edit/promo-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    CommponentsModule,
    FormsModule,
    RoutingModule,
    NgbModule,
    NgxPaginationModule

  ],
  exports: [NotFoundComponent, MenuComponent, HomeComponent, SettingComponent, SafeHTMLPipe],
  declarations: [
    SafeHTMLPipe,
    NotFoundComponent,
    MenuComponent,
    HomeComponent,
    SettingComponent,
    ChainComponent,
    EstablishmentsComponent,
    WorkTimeComponent,
    DishComponent,
    CategoryComponent,
    CategoryGlobalComponent,
    ComplementComponent,
    BoxComponent,
    OrderComponent,
    OrderDeliveryComponent,
    OrderSelfComponent,
    OrderReservationComponent,
    EstCreateComponent,
    EstEditComponent,
    DishCreateComponent,
    DishEditComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    ComplementCreateComponent,
    ComplementEditComponent,
    BoxEditComponent,
    BoxCreateComponent,
    MenuCreateComponent,
    MenuEditComponent,
    ActionComponent,
    HelpComponent,
    OrderDetailComponent,
    OrderDetailEditComponent,
    PaymentPipe,
    StatusPipe,
    OrderPipe,
    BalansComponent,
    OverviewComponent,
    AnalyticsComponent,
    PromoComponent,
    PromoCreateComponent,
    PromoEditComponent,
  ],
  providers: [
    ApiService,
  ],
})
export class PagesModule { }
