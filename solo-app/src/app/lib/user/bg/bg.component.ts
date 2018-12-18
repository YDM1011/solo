import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../user";

@Component({
  selector: 'app-bg',
  templateUrl: './bg.component.html',
  styleUrls: ['./bg.component.css']
})
export class BgComponent implements OnInit {

  public btn = '<span class="btn-bg button-upload"><span class="btn-bg_img"></span><span class="btn-bg_tt">Редагувати</span></span>';
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
