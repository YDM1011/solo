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

@NgModule({
  imports: [
    CommonModule,
    CommponentsModule,
    FormsModule,
    RoutingModule,

  ],
  exports: [NotFoundComponent, MenuComponent, HomeComponent, SettingComponent],
  declarations: [
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
  ],
  providers: [
    ApiService,
  ],
})
export class PagesModule { }
