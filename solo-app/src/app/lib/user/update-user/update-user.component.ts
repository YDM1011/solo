import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from "../../../auth.service";
import {UserService} from "../user.service";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user: any;
  @Input() id: string;
  constructor(
    private auth: UserService
  ) { }

  ngOnInit() {
    this.auth.onUserData.subscribe((val: any)=>{
      this.user = val;
    })
  }
}
