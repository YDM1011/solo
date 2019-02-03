import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {FormApiService} from "../../form-api/form-api.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit, OnChanges {

  @Input() id;
  @Input() likes;
  private domain: string = environment.apiDomain;
  public likeActive;
  constructor(
    private http:  HttpClient,
    private cookies:  CookieService,
    private api: FormApiService
  ) { }

  ngOnInit() {
    console.log('id', this.id);
    console.log('likes', this.likes);
    if(this.likes){
      this.checkactive(this.likes)
    }
  }
  ngOnChanges(){
    if(this.likes){
      this.checkactive(this.likes)
    }
  }
  liked(){
    let self = this;
    this.http.post(`${this.domain}/api/like`, {postId: this.id}, this.api.getHeaders())
      .subscribe((like: any) => {
        if(like){
          console.log(like);
          self.likes = like;
          self.checkactive(self.likes)
        }
      },err=>{});
  }

  checkactive(likes){
    let s = this;
    s.likeActive = false;
    likes.map(like=>{
      if(like == s.cookies.get('userid')){
        s.likeActive = true;
        return
      }
    });
  }
}
