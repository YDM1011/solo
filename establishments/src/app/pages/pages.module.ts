import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { MenuContentComponent } from './menu-content/menu-content.component';
import {CommponentsModule} from "../commponents/commponents.module";
import { InfoContentComponent } from './info-content/info-content.component';
import { ActionPageComponent } from './action-page/action-page.component';
import {MzCollapsibleModule} from "ngx-materialize";
import { LikeDishPageComponent } from './like-dish-page/like-dish-page.component';

@NgModule({
  imports: [
    CommonModule,
    CommponentsModule,
    MzCollapsibleModule,

  ],
  exports: [MenuContentComponent],
  declarations: [NotFoundComponent, MenuContentComponent, InfoContentComponent, ActionPageComponent, LikeDishPageComponent]
})
export class PagesModule { }
