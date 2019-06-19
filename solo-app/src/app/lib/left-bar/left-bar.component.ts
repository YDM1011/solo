import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth.service";
import {CoreService} from "../../core.service";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../user/user.service";
import {FormApiService} from "../form-api/form-api.service";
import {Title} from "@angular/platform-browser";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.css']
})
export class LeftBarComponent implements OnInit {
  public domain: string = environment.apiDomain;
  public host: string = environment.apiDomain.split('//')[1];
  public user: any;
  public people: any = [];
  public id: string;
  public userId: string;
  public isShow = false;
  public isFriendPage = false;
  public isGaleryPage = false;
  public isBascketPage = false;
  public isProfilePage = false;
  public onLoadPhoto = false;
  public favoriteEst;
  public userPhoto;
  public obj: any;
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private core: CoreService,
    private http:  HttpClient,
    private router: Router,
    private cookie: CookieService,
    private userME: UserService,
    private api: FormApiService,
    private titleService: Title
  ) {}
  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
  ngOnChanges() {}
  ngOnInit() {
    const self = this;
    self.auth.onAuth.subscribe(value => {
      if (value) {
        self.user = value;
        self.setTitle(this.user.firstName);
        self.auth.setUserData(value);
        self.apiInitial(value._id);
      }
    });
    self.userME.getMe().then((val: any) => {
      if (val) {
        self.userPhoto = val.photo;
        self.onLoadPhoto = true;
      }
    });
    self.userId = self.auth.getUserId();
    this.id = this.route.snapshot.paramMap.get('id') || self.cookie.get('userid');
    this.obj = JSON.stringify({id: this.id});

    this.core.onClick.subscribe((val: any) => {
      if (val) {
      }
    });

    this.route.params.subscribe((params: any) => {
      this.id = this.route.snapshot.paramMap.get('id') || self.cookie.get('userid');
      this.obj = JSON.stringify({id: this.id});
      self.apiInitial(this.id);
    });
  }

  apiInitial(idc) {
    const self = this;

    this.http.get(this.domain + '/api/favorite/favoritest/' + idc, this.api.getHeaders())
      .subscribe((est: any) => {
        self.favoriteEst = est.favoritest;
        //if(self.favoriteEst){
        //  this.http.get(this.domain + '/api/galery/' + self.favoriteEst.av, this.api.getHeaders())
        //    .subscribe((estAv: any) => {
        //      self.favoriteEst.av = estAv;
        //    });
        //}

      });

    this.http.get(`${this.domain}/api/setting/${idc}`, this.api.getHeaders())
      .subscribe((user: any) => {
        if (user.mes === 'You are not valid') {
          return self.router.navigate([`user/${self.auth.getUserId()}`]);
        }
        self.getSetting(user);
      });
  }

  getSetting(res) {
    const self = this;
    if (res) {
      self.user = res[0];
      if(self.user.firstName && self.user.lastName){
        self.setTitle(`${self.user.firstName} ${self.user.lastName}`);
      }
      self.core.setValidProfile(res[1]);
      self.auth.setUserData(res);
    }
  }
  more(res) {
    this.people = res;
  }
}
