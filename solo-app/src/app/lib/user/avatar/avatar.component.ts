import {Component, OnChanges, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../user";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit, OnChanges {

  public btn = '<span class="btn-bg button-upload"><span class="btn-bg_img"></span><span class="btn-bg_tt">Редагувати</span></span>';
  public user: User;
  public loader: any;

  constructor(
    private auth: UserService
  ) { }

  ngOnInit() {
    this.auth.onUserData.subscribe((val: any)=>{
      this.user = val;
    })
  }
  ngOnChanges(){
    this.auth.onUserData.subscribe((val: any)=>{
      this.user = val;
    })
  }
  getLoader(elem){
    this.loader = elem;
    this.loader.forImg='photo';
  }
}

