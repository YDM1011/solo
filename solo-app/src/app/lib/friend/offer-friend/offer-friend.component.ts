import {Component, OnInit, Input} from '@angular/core';
import {FriendsService} from "../friends.service";

@Component({
  selector: 'app-offer-friend',
  templateUrl: './offer-friend.component.html',
  styleUrls: ['./offer-friend.component.css']
})
export class OfferFriendComponent implements OnInit {

  @Input() userId;
  public isInvite;
  constructor(
    private friends: FriendsService
  ) { }

  ngOnInit() {
    let self = this;
    this.friends.onInvite.subscribe((res:any)=>{
      if(res)
        if(res.user == self.userId){
          self.isInvite = res.isInvite;
        }
    })
  }
  offerFriend(){
    let self = this;
    this.friends.offerFriend(this.userId).then(res=>{
      self.friends.checkInvite(this.userId)
    })
  }
  delOffer(){
    let self = this;
    this.friends.delOffer(this.userId).then(res=>{
      self.friends.checkInvite(this.userId)
    })
  }
}
