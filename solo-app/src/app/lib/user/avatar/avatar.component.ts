import {Component, OnInit, ElementRef, TemplateRef, Input} from '@angular/core';
import {UploadService} from "../../upload/upload.service";
import {User} from "../user";
import {AuthService} from "../../../auth.service";
import {UserService} from "../user.service";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {
  public user: User;
  public btn = '<span class="button-av"><span class="button-av_img"></span><span class="button-av_text">Редагувати</span></span>';

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

