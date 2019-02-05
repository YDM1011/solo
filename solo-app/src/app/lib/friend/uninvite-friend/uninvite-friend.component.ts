import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {FriendsService} from "../friends.service";

@Component({
  selector: 'app-uninvite-friend',
  templateUrl: './uninvite-friend.component.html',
  styleUrls: ['./uninvite-friend.component.css']
})
export class UninviteFriendComponent implements OnInit, OnChanges {

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
    this.friends.addFriend(this.userId).then(res=>{
      self.friends.checkInvite(this.userId)
    })
  }

}
