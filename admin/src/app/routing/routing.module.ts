import { NgModule, Input } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "../pages/not-found/not-found.component";
import { InitLayoutComponent } from "../init-layout/init-layout.component";
import { MenuComponent } from "../pages/menu/menu.component";
import {SettingComponent} from "../pages/setting/setting.component";
import {ChainComponent} from "../pages/chain/chain.component";
import {EstablishmentsComponent} from "../pages/establishments/establishments.component";
import {WorkTimeComponent} from "../pages/work-time/work-time.component";
import {OrderComponent} from "../pages/order/order.component";
import {OrderDeliveryComponent} from "../pages/order-delivery/order-delivery.component";
import {OrderSelfComponent} from "../pages/order-self/order-self.component";
import {OrderReservationComponent} from "../pages/order-reservation/order-reservation.component";
import {ComplementComponent} from "../pages/complement/complement.component";
import {CategoryGlobalComponent} from "../pages/category-global/category-global.component";
import {BoxComponent} from "../pages/box/box.component";
import {DishComponent} from "../pages/dish/dish.component";
import {EstCreateComponent} from "../pages/est-create/est-create.component";
import {EstEditComponent} from "../pages/est-edit/est-edit.component";
import {DishCreateComponent} from "../pages/dish-create/dish-create.component";
import {DishEditComponent} from "../pages/dish-edit/dish-edit.component";
import {CategoryComponent} from "../pages/category/category.component";
import {CategoryCreateComponent} from "../pages/category-create/category-create.component";
import {CategoryEditComponent} from "../pages/category-edit/category-edit.component";
import {ComplementEditComponent} from "../pages/complement-edit/complement-edit.component";
import {ComplementCreateComponent} from "../pages/complement-create/complement-create.component";
import {BoxCreateComponent} from "../pages/box-create/box-create.component";
import {BoxEditComponent} from "../pages/box-edit/box-edit.component";
import {MenuCreateComponent} from "../pages/menu-create/menu-create.component";
import {MenuEditComponent} from "../pages/menu-edit/menu-edit.component";
import {ActionComponent} from "../pages/action/action.component";
import {HelpComponent} from "../pages/help/help.component";
import {OrderDetailComponent} from "../pages/order-detail/order-detail.component";
import {OrderDetailEditComponent} from "../pages/order-detail-edit/order-detail-edit.component";
const routes: Routes = [
  { path: '',
    component: InitLayoutComponent,
    children: [
      {path:'chain/:id', component:ChainComponent},
      {path:'establishments/:id',component:EstablishmentsComponent,children: [
        {path:'create/:id',component:EstCreateComponent},
        {path:'edit/:pid/:id',component:EstEditComponent}
      ]},
      {path:'work_time/:id',component:WorkTimeComponent,children:[
      ]},
      {path:'menu/:id', component:MenuComponent,children:[
        {path:'create/:id',component:MenuCreateComponent},
        {path:':id/:editid',component:MenuEditComponent}
      ]},
      {path:'dish/:id',component:DishComponent,children:[
        {path:'create/:id',component:DishCreateComponent},
        {path:':id/:editid',component:DishEditComponent}
      ]},
      {path:'category/:id',component:CategoryComponent,children:[
        {path:'create/:id',component:CategoryCreateComponent},
        {path:':id/:editid',component:CategoryEditComponent}
      ]},
      {path:'global_category/:id', component:CategoryGlobalComponent},
      {path:'complement/:id', component:ComplementComponent,children:[
        {path:'create/:id',component:ComplementCreateComponent},
        {path:':id/:editid',component:ComplementEditComponent}
      ]},
      {path:'box/:id', component:BoxComponent,children:[
        {path:'create/:id',component:BoxCreateComponent},
        {path:':id/:editid',component:BoxEditComponent}
      ]},
      {path:'order/:id',component:OrderComponent},
      {path:'order/:eid/:id',component:OrderDetailComponent, children:[
          {path:':eid/:id/:editid',component:OrderDetailEditComponent}
        ]},
      {path:'orders/:ordType/:id',component:OrderDeliveryComponent},
      {path:'get_by_self/:id',component:OrderSelfComponent},
      {path:'reservation/:id', component:OrderReservationComponent},
      {path:'setting', component:SettingComponent},
      {path:'action/:id', component:ActionComponent},
      {path:'help', component:HelpComponent}
    ]
  },
  { path: '**', component: NotFoundComponent }
];
@NgModule({
  exports: [ RouterModule ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  declarations: []
})
export class RoutingModule {
  @Input() link;
  routes = this.link;
}
