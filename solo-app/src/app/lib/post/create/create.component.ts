import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CoreService} from "../../../core.service";
import {PostService} from "../post.service";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public btn = '<span class="svg picture"></span><span class="title_add-images">Додати фото</span>';

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

  active: string = '';
  activePost(){
    this.active = 'active';
  }
  selectOf(){
    const select =  document.querySelectorAll('.select');
    for (let i = 0; i < select.length; i++ ){
      console.log(select[i])
    }
  }
}
