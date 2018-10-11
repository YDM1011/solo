import {Component, OnInit, Input} from '@angular/core';
import {FriendsService} from "../friends.service";

@Component({
  selector: 'app-del-friend',
  templateUrl: './del-friend.component.html',
  styleUrls: ['./del-friend.component.css']
})
export class DelFriendComponent implements OnInit {

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
  delFriend(){
    let self = this;
    this.friends.delFriend(this.userId).then(res=>{
      self.friends.checkInvite(this.userId)
    })
  }
}
