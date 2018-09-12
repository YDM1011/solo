import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MzBadgeModule} from "ngx-materialize";
import { FriendsLinkComponent } from './friends-link/friends-link.component';

@NgModule({
  imports: [
    CommonModule,
    MzBadgeModule

  ],
  exports: [
    FriendsLinkComponent
  ],
  declarations: [FriendsLinkComponent]
})
export class FriendsModule { }
