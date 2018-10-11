import {Component, OnInit, Input} from '@angular/core';
import {FriendsService} from "../friends.service";

@Component({
  selector: 'app-meet-friend',
  templateUrl: './meet-friend.component.html',
  styleUrls: ['./meet-friend.component.css']
})
export class MeetFriendComponent implements OnInit {

  @Input() userId;
  public isFriend;
  public isMeet;
  public isInvite;
  constructor(
    private friends: FriendsService
  ) { }

  ngOnInit() {
    let self = this;
    this.friends.onInvite.subscribe((res:any)=>{
      if(res)
        if(res.user == self.userId){
          self.isMeet = res.isMeet;
          self.isFriend = res.isFriend;
          self.isInvite = res.isInvite;
        }
    })
  }
  meetFriend(){
    let self = this;
    this.friends.meetFriend(this.userId).then(res=>{
      self.friends.checkInvite(this.userId)
    })
  }
  delMeetFriend(){
    let self = this;
    this.friends.delMeetFriend(this.userId).then(res=>{
      self.friends.checkInvite(this.userId)
    })
  }
}
