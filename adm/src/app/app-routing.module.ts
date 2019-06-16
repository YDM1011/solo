import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {IsLogoutGuard} from "./is-logout.guard";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {SigninComponent} from "./signin/signin.component";
import {IsLoginedGuard} from "./is-logined.guard";
import {CheckBoxComponent} from "./pages/check-box/check-box.component";
import {HomeComponent} from "./pages/home/home.component";
import {CategoryComponent} from "./pages/category/category.component";
import {ModerationComponent} from "./pages/moderation/moderation.component";
import {FiltersComponent} from "./pages/filters/filters.component";
import {LabelsComponent} from "./pages/labels/labels.component";
import {FudcoinComponent} from "./pages/fudcoin/fudcoin.component";
import {UserComponent} from "./pages/user/user.component";
import {OrderComponent} from "./pages/order/order.component";
import {OrderDetailComponent} from "./pages/order-detail/order-detail.component";
import {OrderDetailEditComponent} from "./pages/order-detail-edit/order-detail-edit.component";
import {OrderDeliveryComponent} from "./pages/order-delivery/order-delivery.component";

const routes: Routes = [
  { path: '',
    component: LayoutComponent,
    canActivate: [IsLoginedGuard],
    children: [{path:'', component: HomeComponent},
      {path:'checkbox', component: CheckBoxComponent},
      {path:'moderation', component: ModerationComponent},
      {path:'category', component: CategoryComponent},
      {path:'filters', component: FiltersComponent},
      {path:'labels', component: LabelsComponent},
      {path:'foodcoin', component: FudcoinComponent},
      {path:'user', component: UserComponent},
      {path:'order', component: OrderComponent},
      {path:'order/:eid/:id',component:OrderDetailComponent, children:[
        {path:':eid/:id/:editid',component:OrderDetailEditComponent}
      ]},
      {path:'orders/:ordType',component:OrderDeliveryComponent}
      ]
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [IsLogoutGuard]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
