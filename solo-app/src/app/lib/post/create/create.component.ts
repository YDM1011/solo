import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CoreService} from "../../../core.service";
import {PostService} from "../post.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public btn = '<span class="btn waves-effect  deep-purple darken-4">Pics uploader</span>';
  public postObg = {
    title: '',
    des: '',
    img: ''
  };
  constructor(
    private post: PostService
  ) { }

  ngOnInit() {
  }

  addPost(post){
    let self = this;
    self.post.pushPost(post);
    self.postObg = {
      title: '',
      des: '',
      img: ''
    };
  }
}
