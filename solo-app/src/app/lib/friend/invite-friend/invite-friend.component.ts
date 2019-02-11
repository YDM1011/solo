import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {FriendsService} from "../friends.service";

@Component({
  selector: 'app-invite-friend',
  templateUrl: './invite-friend.component.html',
  styleUrls: ['./invite-friend.component.css']
})
export class InviteFriendComponent implements OnInit, OnChanges {

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
  ngOnChanges(){
    let self = this;
    if(this.userId)
      self.friends.checkInvite(this.userId)
  }
  addFriend(){
    let self = this;
    self.friends.addFriend(self.userId).then(res=>{
      self.friends.checkInvite(self.userId)
    })
  }
}
