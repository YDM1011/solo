import {Component, OnChanges, OnInit} from '@angular/core';
import { ApiService } from '../../service/api.service';
import {environment} from "../../../../../solo-app/src/environments/environment";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnChanges {

  public posts: any;
  public postsCount: any;
  public isMore: boolean = true;
  public estAvatar: any;
  public estMyAvatar: any;
  public host: string = environment.apiDomain;
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    const s = this;
    s.initApi();
  }
  ngOnChanges(){}

  initApi() {
    const s = this;
    s.api.onAvatar.subscribe(val => {
      if (val) {
        s.estAvatar = val;
      }
    });
    s.api.get('est_post').then((val: any) => {
      if (val) {
        s.posts = val;
        s.getCount(s.posts.length)
      }
    });
  }
  getMore(){
    let s = this;
    s.api.get('est_post?skip='+s.posts.length/4).then((val: any) => {
      if (val) {
        s.posts = s.posts.concat(val);
        if(s.posts.length >= s.postsCount ){
          s.isMore = false
        }else{
          s.isMore = true
        }
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
}
