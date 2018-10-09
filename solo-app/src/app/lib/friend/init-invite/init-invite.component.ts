import {Component, OnInit, Input} from '@angular/core';
import {FriendsService} from "../friends.service";

@Component({
  selector: 'app-init-invite',
  templateUrl: './init-invite.component.html',
  styleUrls: ['./init-invite.component.css']
})
export class InitInviteComponent implements OnInit {
  @Input() userId;
  public isInvite;
  constructor(
    private friends: FriendsService
  ) { }

  ngOnInit() {
    let self = this;
    this.friends.checkInvite(this.userId).then((res:any)=>{
      if (res.user == self.userId)
      self.isInvite = res.isInvite;
    })
  }
}
