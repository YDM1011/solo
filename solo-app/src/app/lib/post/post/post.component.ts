import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CoreService} from "../../../core.service";
import {environment} from "../../../../environments/environment";
import {PostService} from "../post.service";
import {count} from "rxjs/internal/operators";
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
  public isShow: boolean = true;
  constructor(
    private core: CoreService,
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
    })
  }
  setcount(s){
    this.maxcount = s.count;
    this.check();
  }
  more(res){
    let self = this;
    self.count++;
    self.posts = self.posts.concat(res);
    self.check();
  }
  check(){
    console.log(this.maxcount);
    if(this.maxcount-1<this.limit*this.count){
      this.isShow = false
    }
  }
}
