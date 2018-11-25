import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgComponent } from './img/img.component';
import { HeaderComponent } from './header/header.component';
import { MzSidenavModule } from "ngx-materialize";
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

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    MzSidenavModule
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
    BasketComponent
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
    BasketComponent
  ]
})
export class CommponentsModule { }
