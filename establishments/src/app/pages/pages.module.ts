import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { MenuContentComponent } from './menu-content/menu-content.component';
import {CommponentsModule} from "../commponents/commponents.module";
import { InfoContentComponent } from './info-content/info-content.component';

@NgModule({
  imports: [
    CommonModule,
    CommponentsModule
  ],
  exports: [MenuContentComponent],
  declarations: [NotFoundComponent, MenuContentComponent, InfoContentComponent]
})
export class PagesModule { }