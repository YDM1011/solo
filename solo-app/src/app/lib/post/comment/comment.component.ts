import {Component, OnInit, Input} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {FormApiService} from "../../form-api/form-api.service";
import {AuthService} from "../../../auth.service";
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() postId;
  @Input() comments;
  private domain: string = environment.apiDomain;
  public comment = {des: '', postId: ''};
  public userPhoto = {};
  constructor(
    private http:  HttpClient,
    private api: FormApiService,
    private user: UserService
  ) { }

  ngOnInit() {
    let self = this;
    this.defComment();
    this.user.onMe.subscribe((val:any)=>{
      if(val){
        self.userPhoto = val.photo;
      }
    })
  }
  commented(){
    let self = this;
    this.comment.postId = this.postId;
    this.http.post(`${this.domain}/api/comment`, this.comment, this.api.getHeaders())
      .subscribe((val: any) => {
        if(val.userIdCom){
          self.comments.push(val);
          self.defComment()
        }
      },err=>{});
  }

  defComment(){
    this.comment.des = '';
  }
  likeCom(id){
    let self = this;
    this.http.post(`${this.domain}/api/likeCom`, {_id: id}, this.api.getHeaders())
      .subscribe((like: any) => {
        if(like){
          self.comments.find(x => x._id === id).likeCom = like;
        }
      },err=>{});

  }
}
