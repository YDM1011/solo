import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../user";

@Component({
  selector: 'app-bg',
  templateUrl: './bg.component.html',
  styleUrls: ['./bg.component.css']
})
export class BgComponent implements OnInit {

  public btn = '<span class="btn waves-effect  deep-purple darken-4">Додати шпалери</span>';
  public user: User;
  public loader: any;

  constructor(
    private auth: UserService
  ) { }

  ngOnInit() {
    this.auth.onUserData.subscribe((val: any)=>{
      this.user = val;
      console.log(val);
    })
  }
  getLoader(elem){
    this.loader = elem;
    this.loader.forImg='bg';
  }
}
