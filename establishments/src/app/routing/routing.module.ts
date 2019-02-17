import { NgModule, Input } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "../pages/not-found/not-found.component";
import { InitLayoutComponent } from "../init-layout/init-layout.component";
import {MenuContentComponent} from "../pages/menu-content/menu-content.component";
import {InfoContentComponent} from "../pages/info-content/info-content.component";
import {BasketComponent} from "../commponents/basket/basket.component";
import {ActionPageComponent} from "../pages/action-page/action-page.component";
import {LikeDishPageComponent} from "../pages/like-dish-page/like-dish-page.component";
const routes: Routes = [
  { path: '',
    component: InitLayoutComponent,
    children: [
      {path: 'menu/:id', component: MenuContentComponent},
      {path: 'basket', component: BasketComponent},
      {path: 'info/:id', component: InfoContentComponent},
      {path: 'action/:id', component: ActionPageComponent},
      {path: 'like_dish', component: LikeDishPageComponent},
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
