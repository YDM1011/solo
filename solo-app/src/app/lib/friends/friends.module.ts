import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsComponent } from './friends.component';
import {MzBadgeModule} from "ngx-materialize";

@NgModule({
  imports: [
    CommonModule,
    MzBadgeModule

  ],
  exports: [
    FriendsComponent
  ],
  declarations: [FriendsComponent]
})
export class FriendsModule { }
