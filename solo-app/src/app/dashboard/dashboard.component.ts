import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../core.service";
import {FormApiService} from "../lib/form-api/form-api.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  domain: string = environment.apiDomain;
  public user: any;
  public people: any = [];
  public id: string;
  private maxcount: number;
  private isShow: boolean = true;
  public count = 0;
  public limit = 4;
  public posts = [];
  public obj: any;
  public sel: any;
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private core: CoreService,
    private http:  HttpClient,
    private api: FormApiService
  ) { }

  ngOnInit() {
    let self = this;
    self.auth.onAuth.subscribe(value=>{
      if(value){
       self.user = value;
       self.auth.setUserData(value);
      }
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.obj = JSON.stringify({id: this.id});
    this.sel = JSON.stringify('-pass,-token,-_id,-login');
    this.check();

    this.route.params.subscribe((params:any) => {
      let id = JSON.stringify({id: params.id}),
      count = 0,
      limit = 4;
      self.count = 0;
      self.limit = 4;

      this.http.get(`${this.domain}/api/setting/${params.id}`, this.api.getHeaders())
        .subscribe((user: any) => {
          self.getSetting(user)
        });
      this.http.get(this.domain+'/api/post?query='+id+'&limit='+limit+'&skip='+count*limit, this.api.getHeaders())
        .subscribe((user: any) => {
          this.http.get(this.domain+'/api/post/count?query='+id, this.api.getHeaders())
            .subscribe((res: any) => {
              self.posts = (user);
              self.setcount(res);
            });
        });
    });
  }

  getSetting(res){
    let self = this;
    console.log(res);
    if(res){
      self.user = res[0];
      self.core.setValidProfile(res[1]);
      self.auth.setUserData(res);
    }
  };
  more(res){
    this.people = res;
  }
  setcount(s){
    this.maxcount = s.count;
    this.check();
  }
  morePost(){
    let self = this;
    self.count++;
    this.http.get(this.domain+'/api/post?query='+this.obj+'&limit='+this.limit+'&skip='+this.count*this.limit, this.api.getHeaders())
      .subscribe((user: any) => {
        self.posts = self.posts.concat(user);
        self.check();
      });

  }
  check(){
    if(this.maxcount-this.limit<this.limit*this.count){
      this.isShow = false
    }else{
      this.isShow = true
    }
  }

}
