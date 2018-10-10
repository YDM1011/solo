import {Component, OnInit, Input} from '@angular/core';
import {FormApiService} from "../../form-api/form-api.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  @Input() id;
  @Input() likes;
  private domain: string = environment.apiDomain;
  constructor(
    private http:  HttpClient,
    private api: FormApiService
  ) { }

  ngOnInit() {
  }
  liked(){
    let self = this;
    this.http.post(`${this.domain}/api/like`, {postId: this.id}, this.api.getHeaders())
      .subscribe((like: any) => {
        if(like){
          console.log(like);
          self.likes = like;
        }
      },err=>{});

  }

}
