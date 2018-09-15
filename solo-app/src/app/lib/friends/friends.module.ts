import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MzBadgeModule, MzChipModule} from "ngx-materialize";
import { FriendsLinkComponent } from './friends-link/friends-link.component';
import { FriendsChipComponent } from './friends-chip/friends-chip.component';

@NgModule({
  imports: [
    CommonModule,
    MzBadgeModule,
    MzChipModule
  ],
  exports: [
    FriendsLinkComponent,
    FriendsChipComponent
  ],
  declarations: [FriendsLinkComponent, FriendsChipComponent]
})
export class FriendsModule { }
