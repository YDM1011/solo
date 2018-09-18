import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CoreService} from "../../../core.service";
import {environment} from "../../../../environments/environment";
import {PostService} from "../post.service";
import {count} from "rxjs/internal/operators";
import {AuthService} from "../../../auth.service";
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public count = 0;
  public maxcount = 0;
  public limit = 4;
  public posts = [];
  public user;
  public next: boolean = false;
  public isShow: boolean = true;
  public domain: string = environment.apiDomain;
  constructor(
    private core: CoreService,
    private auth: AuthService,
    private http:  HttpClient,
    private post: PostService
  ) { }

  ngOnInit() {
    let self = this;
    self.post.onSetting.subscribe(value=>{
      if(value){
        self.core.error(value);
        self.posts.push(value);
        self.check();
      }
    });
    self.auth.onUserData.subscribe(value=>{
      if(value){
        this.user = value;
      }
    });
  }
  setcount(s){
    this.maxcount = s.count;
    this.check();
  }
  more(res){
    let self = this;
    // res.forEach(item=>{
    //   self.http.get(self.domain+'/api/user?query=%7B%22_id%22:%22'+item.userId+'%22%7D&').subscribe((val:any)=>{
    //     item.avatar = val.avatar;
    //     item.firstName = val.firstName;
    //     item.lastName = val.lastName;
    //   })
    // });
    self.count++;
    self.posts = self.posts.concat(res);
    self.check();
  }
  check(){
    if(this.maxcount-1<this.limit*this.count){
      this.isShow = false
    }
  }
}
