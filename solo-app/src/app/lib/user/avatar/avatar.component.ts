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
  public btn = '<span class="btn waves-effect  deep-purple darken-4">Завантажити Аватар</span>';
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
    // this.img = this.userservice.getImg();
    console.log(this.avatar);
    if(this.avatar){
      this.userservice.setImg(this.avatar, this.type).then((val:any)=>{
        self.avatar = val;
        console.log(self.avatar);
      }).catch(err=>{console.log(err); self.avatar = null});
    }
  }
  ngOnInit() {
    let self = this;
    // this.img = this.userservice.getImg();
    // if(this.avatar){
    //   this.userservice.setImg(this.avatar).then((val:any)=>{
    //     self.avatar = val;
    //   });
    // }
    // this.userservice.onUserData.subscribe((val: any)=>{
    //   this.user = val;
      // this.img[this.user.avatar._id] = '';
      // this.userservice.setImg(this.img);
      // this.http.get(`${this.domain}/api/avatar/${this.user.avatar._id}`,
      //   this.api.getHeaders())
      //   .subscribe((img: any) => {
      //     self.user.avatar = img;
      //     this.img[this.user.avatar._id] = img;
      //   });
    // });
    this.userservice.onAvatar.subscribe((val: any)=>{
      if(val){
        self.photo = val;
      }
    });
  }

}

