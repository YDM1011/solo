import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import { ApiService } from '../../service/api.service';
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnChanges, OnDestroy {

  public posts: any;
  public postsCount: any;
  public isMore: boolean = true;
  public estAvatar: any;
  public estMyAvatar: any;
  public load = true;
  public host: string = environment.apiDomain;
  constructor(
    private api: ApiService,
    private cookie: CookieService
  ) { }

  ngOnInit() {
    const s = this;
    s.initApi();
  }
  ngOnChanges(){}
  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  initApi() {
    const s = this;
    s.api.onAvatar.subscribe(val => {
      if (val) {
        s.estAvatar = val;
      }
    });
    s.api.get('est_post?skip=0').then((val: any) => {
      if (val) {
        s.posts = val;
        s.getCount(s.posts.length)
      }
    });
  }
  getMore(){
    let s = this;
    this.load = false;
    s.api.get('est_post?skip='+s.posts.length).then((val: any) => {
      if (val) {
        s.posts = s.posts.concat(val);
        if(s.posts.length >= s.postsCount ){
          s.isMore = false
        }else{
          s.isMore = true
        }        
        this.load = true;
      }
    });
  }

  getCount(postLength){
    let s = this;
    s.api.get('est_post?type=count').then((val: any) => {
      if (val) {
        s.postsCount = val.count;
        if(postLength >= val.count ){
          s.isMore = false
        }else{
          s.isMore = true
        }
      }
    });
  }

  forbidden(err) {
    console.log(err);
  }
  result(val) {
    this.estMyAvatar = val.photo;
  }
  liked(post) {
    const s = this;
    // s.api.create('comment',{des: '', postId: post._id})
    s.api.create('like', {postId: post._id}).then(val => {
      post.like = val;
    });
  }
  commented(post, des) {
    const s = this;
    s.api.create('comment', {des: des, postId: post._id}).then(val => {
      post.commentId.push(val);
    });
  }

  addShare(obj) {
    const s = this;
    this.api.post('share', obj)
      .then((post: any) => {
        // if (post.userId._id == s.auth.getUserId()) {
        //   console.log(post);
        //   // post.share.userIdShare = self.auth.getUserData().avatar;
        //   self.posts.unshift(post);
        // }
      });
  }

  deletePost(post){
    this.api.justDel('post', post._id)
      .then((val:any)=>{
        console.log(val);
        let index = this.posts.indexOf(post);
        this.posts.splice(index,1);
      });
  }
  checkShareActive(users){
    let s = this;
    let is = false;
    users.map(it=>{
      if(it == s.cookie.get('userid')){
        is = true;
      }
    });
    if (is) return true;
    else return false;
  }
  hidden(status) {
    document.body.style.overflow = (status) ? 'hidden' : '';
  }
}
