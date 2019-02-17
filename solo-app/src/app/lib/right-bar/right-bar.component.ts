import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth.service";
import {CoreService} from "../../core.service";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../user/user.service";
import {FormApiService} from "../form-api/form-api.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-right-bar',
  templateUrl: './right-bar.component.html',
  styleUrls: ['./right-bar.component.css']
})
export class RightBarComponent implements OnInit {
  public domain: string = environment.apiDomain;
  public host: string = environment.apiDomain.split('//')[1];
  public user: any;
  public people: any = [];
  public id: string;
  public userId: string;
  public btn = '<span class="btn-av"><span class="btn-av_img"></span><span class="btn-av_tt">Редагувати</span></span>';
  public btnBg = '<span class="btn-bg button-upload"><span class="btn-bg_img"></span><span class="btn-bg_tt">Редагувати</span></span>';
  public isShow = false;
  public isFriendPage = false;
  public isGaleryPage = false;
  public isBascketPage = false;
  public isProfilePage = false;
  public favoriteEst;
  public friends;
  public photos;
  public isHome;
  public userPhoto;
  public mutual = [];
  public obj: any;
  public populate: any = JSON.stringify({path:'photo', select:'preload _id'});
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private core: CoreService,
    private http:  HttpClient,
    private router: Router,
    private cookie: CookieService,
    private userME: UserService,
    private api: FormApiService
  ) {}

  ngOnChanges() {}
  ngOnInit() {
    const self = this;
    self.auth.onAuth.subscribe(value => {
      if (value) {
        self.user = value;
        self.auth.setUserData(value);
        self.apiInitial(value._id);
      }
    });
    self.userId = self.auth.getUserId();
    this.id = this.route.snapshot.paramMap.get('id') || self.cookie.get('userid');
    this.obj = JSON.stringify({id: this.id});


    this.route.params.subscribe((params: any) => {
      self.id = this.route.snapshot.paramMap.get('id') || self.cookie.get('userid');
      self.obj = JSON.stringify({id: self.id});
      self.apiInitial(self.id);
    });
  }

  apiInitial(idc) {
    const self = this;
    this.http.get(this.domain + '/api/favorite/favoritest/' + idc, this.api.getHeaders())
      .subscribe((est: any) => {
        self.favoriteEst = est.favoritest;
        if(self.favoriteEst){
          this.http.get(this.domain + '/api/galery/' + self.favoriteEst.av, this.api.getHeaders())
            .subscribe((estAv: any) => {
              self.favoriteEst.av = estAv;
            });
        }

      });
    this.http.get(this.domain + '/api/getFriends?userId=' + idc, this.api.getHeaders())
      .subscribe((friends: any) => {
        self.friends = (friends);
      });
    this.http.get(this.domain + '/api/getPhoto?userId=' + idc, this.api.getHeaders())
      .subscribe((photo: any) => {
        self.photos = (photo);
      });
  }
}
