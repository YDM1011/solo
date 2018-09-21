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
  public btn = '<span class="btn waves-effect  deep-purple darken-4">Завантажити Аватар</span>';

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

