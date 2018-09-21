import {Component, OnInit, Input} from '@angular/core';
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
  public user;
  public obj;
  public next: boolean = false;
  public isShow: boolean = true;
  public domain: string = environment.apiDomain;
  @Input() id: string;
  @Input() posts: string;
  constructor(
    private core: CoreService,
    private auth: AuthService,
    private http:  HttpClient,
    private post: PostService
  ) { }

  ngOnInit() {
    this.obj = JSON.stringify({id: this.id});
    let self = this;
    self.auth.onUserData.subscribe(value=>{
      if(value){
        this.user = value[0];
      }
    });
  }

}
