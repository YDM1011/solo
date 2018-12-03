import {Component, OnInit, OnChanges} from '@angular/core';
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
export class DashboardComponent implements OnInit, OnChanges {
  public domain: string = environment.apiDomain;
  public host: string = environment.apiDomain.split('//')[1];
  public user: any;
  public people: any = [];
  public id: string;
  public userId: string;
  public btn = '<span class="button-av"><span class="button-av_img"></span><span class="button-av_text">Редагувати</span></span>';
  private maxcount: number;
  public isShow: boolean = false;
  public isFriendPage: boolean = false;
  public isGaleryPage: boolean = false;
  public count = 0;
  public loader;
  public favoriteEst;
  public limit = 4;
  public posts = [];
  public friends;
  public photos;
  public mutual = [];
  public obj: any;
  public sel: any;
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private core: CoreService,
    private http:  HttpClient,
    private router: Router,
    private api: FormApiService
  ) { }
  ngOnChanges(){}
  ngOnInit() {
    let self = this;
    self.auth.onAuth.subscribe(value=>{
      if(value){
       self.user = value;
       self.auth.setUserData(value);
      self.apiInitial(value._id)
      }
    });
    self.userId = self.auth.getUserId();
    this.id = this.route.snapshot.paramMap.get('id');
    this.obj = JSON.stringify({id: this.id});
    this.check();

    this.core.onClick.subscribe((val:any)=>{
      if(val){
        self.mainPage();
      }
    });

    this.route.params.subscribe((params:any) => {
      this.id = this.route.snapshot.paramMap.get('id');
      this.obj = JSON.stringify({id: this.id});
      self.apiInitial(params.id)
    });
  }

  apiInitial(idc){
    let self = this;
    self.mainPage();
    console.log(idc);
    let id = JSON.stringify({id: idc}),
        getFriends = JSON.stringify({path: 'myFriends'}),
      count = 0,
      limit = 4;
    self.count = 0;
    self.limit = 4;
    this.http.get(`${this.domain}/api/setting/${idc}`, this.api.getHeaders())
      .subscribe((user: any) => {
      if(user.mes == "You are not valid"){
        return self.router.navigate([`user/${self.auth.getUserId()}`]);
      }
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
    this.http.get(this.domain+'/api/favorite/favoritest', this.api.getHeaders())
      .subscribe((est: any) => {
        self.favoriteEst = est.favoritest;
        this.http.get(this.domain + '/api/avatar/' + self.favoriteEst.av + '?select=larg', this.api.getHeaders())
          .subscribe((estAv: any) => {
            self.favoriteEst.av = estAv;
          });
      });
    this.http.get(this.domain+'/api/getFriends?userId='+idc, this.api.getHeaders())
      .subscribe((friends: any) => {
        self.friends = (friends);
        // friends.myFriends.forEach((friend)=>{
        //   this.http.get(this.domain+'/api/getMutual/'+friend._id, this.api.getHeaders())
        //     .subscribe((res: any) => {
        //       this.mutual[friend._id] = res.mutual;
        //     });
        // })
      });
    this.http.get(this.domain+'/api/getPhoto?userId='+idc, this.api.getHeaders())
      .subscribe((photo: any) => {
        self.photos = (photo);
      });

  }
  setMutual(res){
    this.mutual[res.id] = res.mutual;
  }
  getSetting(res){
    let self = this;
    if(res){
      self.user = res[0];
      console.log(self.user);
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
    this.id = this.route.snapshot.paramMap.get('id');
    this.obj = JSON.stringify({id: this.id});
    self.count++;
    this.http.get(this.domain+'/api/post?query='+this.obj+'&limit='+this.limit+'&skip='+this.count*this.limit, this.api.getHeaders())
      .subscribe((user: any) => {
        self.posts = self.posts.concat(user);
        self.check();
      });

  }
  check(){
    if(this.maxcount-this.limit<=this.limit*this.count){
      this.isShow = false
    }else{
      this.isShow = true
    }
  }
  mainPage(){
    let self = this;
    self.isFriendPage = false;
    self.isGaleryPage = false;
  }
  friendPage(data){
    this.mainPage();
    this.isFriendPage = true;
  }
  galeryPage(data){
    this.mainPage();
    this.isGaleryPage = true;
  }
}
