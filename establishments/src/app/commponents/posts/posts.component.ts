import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../service/api.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    let s = this;
    s.initApi();
  }

  initApi(){
    let s = this;
    s.api.get('est_post').then((val:any)=>{

    })
  }
}
