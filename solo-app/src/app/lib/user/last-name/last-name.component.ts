import {Component, OnInit, Input} from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../user";

@Component({
  selector: 'app-last-name',
  templateUrl: './last-name.component.html',
  styleUrls: ['./last-name.component.css']
})
export class LastNameComponent implements OnInit {

  @Input() isInput: boolean = false;
  public user: User;

  constructor(
    private auth: UserService
  ) { }

  ngOnInit() {
    this.auth.onUserData.subscribe((val: any)=>{
      this.user = val;
      console.log(val);
    })
  }
}
