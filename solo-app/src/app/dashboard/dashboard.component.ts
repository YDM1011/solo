import {Component, OnInit, OnChanges} from '@angular/core';
import {AuthService} from '../auth.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {CoreService} from '../core.service';
import {FormApiService} from '../lib/form-api/form-api.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Title} from "@angular/platform-browser";
import {UserService} from "../lib/user/user.service";
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
  public btn = '<span class="btn-av"><span class="btn-av_img"></span><span class="btn-av_tt">Редагувати</span></span>';
  public btnBg = '<span class="btn-bg button-upload"><span class="btn-bg_img"></span><span class="btn-bg_tt">Редагувати</span></span>';
  private maxcount: number;
  public isShow = false;
  public isFriendPage = false;
  public isGaleryPage = false;
  public isBascketPage = false;
  public isProfilePage = false;
  public count = 0;
  public favoriteEst;
  public limit = 4;
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
      }
    });
    self.userId = self.auth.getUserId();
    this.id = this.route.snapshot.paramMap.get('id');
    this.obj = JSON.stringify({id: this.id});

    this.core.onClick.subscribe((val: any) => {
      if (val) {
      }
    });

    this.route.params.subscribe((params: any) => {
      this.id = this.route.snapshot.paramMap.get('id');
      this.obj = JSON.stringify({id: this.id});
      self.apiInitial(params.id);
    });
  }

  apiInitial(idc) {
    const self = this;
    const id = JSON.stringify({id: idc}),
        getFriends = JSON.stringify({path: 'myFriends'}),
      count = 0,
      limit = 4;
    self.count = 0;
    self.limit = 4;
    this.http.get(`${this.domain}/api/setting/${idc}`, this.api.getHeaders())
      .subscribe((user: any) => {
      if (user.mes === 'You are not valid') {
        return self.router.navigate([`user/${self.auth.getUserId()}`]);
      }
        self.getSetting(user);
      });
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
  setMutual(res) {
    this.mutual[res.id] = res.mutual;
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
  setcount(s) {
    this.maxcount = s.count;
  }
}
