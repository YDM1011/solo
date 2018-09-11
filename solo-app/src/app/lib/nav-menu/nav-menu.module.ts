import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './nav-menu.component';
import {FoodCoinModule} from "../food-coin/food-coin.module";
import {MzNavbarModule} from "ngx-materialize";
import {SearchModule} from "../search/search.module";
import {ProfileModule} from "../profile/profile.module";
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
    ProfileModule,
    FriendsModule,
    NewsModule,
    TapeModule,
    BasketModule
  ],
  exports: [NavMenuComponent],
  declarations: [NavMenuComponent]
})
export class NavMenuModule { }
