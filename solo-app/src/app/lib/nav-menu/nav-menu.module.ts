import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './nav-menu.component';
import {FoodCoinModule} from "../food-coin/food-coin.module";
import {MzNavbarModule, MzSidenavModule} from "ngx-materialize";
import {SearchModule} from "../search/search.module";
import {UserModule} from "../user/user.module";
import {FriendsModule} from "../friends/friends.module";
import {NewsModule} from "../news/news.module";
import {TapeModule} from "../tape/tape.module";
import {BasketModule} from "../basket/basket.module";

@NgModule({
  imports: [
    CommonModule,
    FoodCoinModule,
    MzNavbarModule,
    SearchModule,
    UserModule,
    FriendsModule,
    NewsModule,
    TapeModule,
    BasketModule,
    MzSidenavModule
  ],
  exports: [NavMenuComponent],
  declarations: [NavMenuComponent]
})
export class NavMenuModule { }
