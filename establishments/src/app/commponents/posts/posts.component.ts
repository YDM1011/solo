import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import {environment} from "../../../../../solo-app/src/environments/environment";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public posts: any;
  public estAvatar: any;
  public estMyAvatar: any;
  public host: string = environment.apiDomain.split('//')[1];
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    const s = this;
    s.initApi();
  }

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
