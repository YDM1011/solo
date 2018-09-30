import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetFriendComponent } from './meet-friend/meet-friend.component';
import { InviteFriendComponent } from './invite-friend/invite-friend.component';
import { UninviteFriendComponent } from './uninvite-friend/uninvite-friend.component';
import { DelFriendComponent } from './del-friend/del-friend.component';
import { OfferFriendComponent } from './offer-friend/offer-friend.component';
import {FriendsService} from "./friends.service";
import { InitInviteComponent } from './init-invite/init-invite.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ MeetFriendComponent, InviteFriendComponent,
    UninviteFriendComponent, DelFriendComponent, OfferFriendComponent, InitInviteComponent],
  declarations: [ MeetFriendComponent, InviteFriendComponent,
    UninviteFriendComponent, DelFriendComponent, OfferFriendComponent, InitInviteComponent],
  providers: [ FriendsService ],
})
export class FriendModule { }
