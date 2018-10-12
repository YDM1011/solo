import {Component, OnInit, Input} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {FormApiService} from "../../form-api/form-api.service";
import {AuthService} from "../../../auth.service";

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
  constructor(
    private http:  HttpClient,
    private api: FormApiService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.defComment()
  }
  commented(){
    let self = this;
    this.comment.postId = this.postId;
    console.log(this.comment);
    this.http.post(`${this.domain}/api/comment`, this.comment, this.api.getHeaders())
      .subscribe((val: any) => {
        if(val){
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
          console.log(self.comments.find(x => x._id === id));
          self.comments.find(x => x._id === id).likeCom = like;
        }
      },err=>{});

  }
}
