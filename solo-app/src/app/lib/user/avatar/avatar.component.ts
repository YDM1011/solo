import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {UserService} from "../user.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {FormApiService} from "../../form-api/form-api.service";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit, OnChanges {
  public photo: any;
  public btn = '<span class="button-av"><span class="button-av_img"></span><span class="button-av_text">Редагувати</span></span> ';
  public loader: any;
  public img: any;
  domain: string = environment.apiDomain;
  @Input() avatar;
  @Input() avatarId;
  @Input() type: string = 'imgMin';
  @Input() array;
  @Input() customClass;

  constructor(
    private http:  HttpClient,
    private api: FormApiService,
    private userservice: UserService
  ) { }

  ngOnChanges(){
    let self = this;
    if(this.avatar){
      this.userservice.setImg(this.avatar, this.type).then((val:any)=>{
        self.avatar = val;
      }).catch(err=>{console.log(err); self.avatar = null});
    }
  }
  ngOnInit() {
    let self = this;
    this.userservice.onAvatar.subscribe((val: any)=>{
      if(val){
        self.photo = val;
      }
    });
  }

}

