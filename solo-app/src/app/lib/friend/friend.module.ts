import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetFriendComponent } from './meet-friend/meet-friend.component';
import { InviteFriendComponent } from './invite-friend/invite-friend.component';
import { UninviteFriendComponent } from './uninvite-friend/uninvite-friend.component';
import { DelFriendComponent } from './del-friend/del-friend.component';
import { OfferFriendComponent } from './offer-friend/offer-friend.component';
import {FriendsService} from "./friends.service";
import { InitInviteComponent } from './init-invite/init-invite.component';
import { ShowFriendsComponent } from './show-friends/show-friends.component';
import {AppRoutingModule} from "../../app-routing.module";
import {UserModule} from "../user/user.module";
import {ScrollToDirective} from "../../scroll-to.directive";

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    UserModule
  ],
  exports: [ MeetFriendComponent, InviteFriendComponent, ShowFriendsComponent,
    UninviteFriendComponent, DelFriendComponent, OfferFriendComponent, InitInviteComponent, ScrollToDirective],
  declarations: [ MeetFriendComponent, InviteFriendComponent,
    UninviteFriendComponent, DelFriendComponent, OfferFriendComponent, InitInviteComponent, ShowFriendsComponent, ScrollToDirective],
  providers: [ FriendsService ],
})
export class FriendModule { }
