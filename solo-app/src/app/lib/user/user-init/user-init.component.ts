import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {User} from "../user";
import {UserService} from "../user.service";

@Component({
  selector: 'app-user-init',
  templateUrl: './user-init.component.html',
  styleUrls: ['./user-init.component.css']
})
export class UserInitComponent implements OnChanges {

  @Input() user: User;
  constructor(
    private auth: UserService
  ) { }


  ngOnChanges() {
    //noinspection TypeScriptUnresolvedFunction
    if (this.user){
      console.log('asd',this.user);
      this.auth.setUserData(this.user)
    }
  }

}
