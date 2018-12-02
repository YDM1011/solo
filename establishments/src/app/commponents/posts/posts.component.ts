import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../service/api.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public posts:any;
  public estAvatar:any;
  public estMyAvatar:any;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    let s = this;
    s.initApi();
  }

  initApi(){
    let s = this;
    s.api.onAvatar.subscribe(val=>{
      if(val){
        s.estAvatar = val
      }
    });
    s.api.get('est_post').then((val:any)=>{
      if(val){
        s.posts = val;
      }
    })
  }
  forbidden(err){
    console.log(err);
  }
  result(val){
    this.estMyAvatar = val.photo.imgMin;
  }
  liked(post){
    let s=this;
    // s.api.create('comment',{des: '', postId: post._id})
    s.api.create('like',{postId: post._id}).then(val=>{
      post.like = val;
    })
  }
  commented(post,des){
    let s = this;
    s.api.create('comment',{des: des, postId: post._id}).then(val=>{
      post.commentId.push(val);
    })
  }
}
