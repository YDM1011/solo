import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MzBadgeModule,
  MzButtonModule,
  MzCheckboxModule,
  MzCollapsibleModule,
  MzTextareaModule
} from "ngx-materialize";
import { TapeLinkComponent } from './tape-link/tape-link.component';
import { TapePageComponent } from './tape-page/tape-page.component';
import {SearchModule} from "../search/search.module";
import {FriendsModule} from "../friends/friends.module";

@NgModule({
  imports: [
    CommonModule,
    MzBadgeModule,
    MzTextareaModule,
    MzCollapsibleModule,
    MzCheckboxModule,
    SearchModule,
    MzButtonModule,
    FriendsModule
  ],
  exports: [
    TapeLinkComponent,
    TapePageComponent
  ],
  declarations: [TapeLinkComponent, TapePageComponent]
})
export class TapeModule { }
