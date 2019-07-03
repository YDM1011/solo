import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {CoreService} from "../core.service";
import {HttpClient} from "@angular/common/http";
import {FormApiService} from "../lib/form-api/form-api.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnChanges {

  public domain: string = environment.apiDomain;
  public host: string = environment.apiDomain.split('//')[1];
  public user: any;
  public maxcount: any;
  public id: any;
  public obj: any;
  public posts: any = [];
  public count: number = 0;
  public limit: number = 16;
  public isShow: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private core: CoreService,
    private http:  HttpClient,
    private router: Router,
    private api: FormApiService
  ) { }
  ngOnChanges() {}
  ngOnInit() {
    const s = this;
    // location.href.split("user/")[1]
    this.id =location.href.split("user/")[1].split("/")[0];
    this.obj = JSON.stringify({id: this.id});
    s.auth.onAuth.subscribe(value => {
      if (value) {
        s.user = value;
        s.auth.setUserData(value);
        s.apiInitial(value._id);
      }
    });
    this.route.params.subscribe((params: any) => {
      s.id = location.href.split("user/")[1].split("/")[0];
      s.obj = JSON.stringify({id: s.id});
      //console.log(s.id);
      s.apiInitial(s.id);
    });
  }

  apiInitial(idc) {
    const s = this;

    s.obj = JSON.stringify({id: idc, $or:[{estId:{$exists:false}},{estId:null}]});

    this.http.get(`${this.domain}/api/setting/${idc}`, this.api.getHeaders())
      .subscribe((user: any) => {
        if (user.mes === 'You are not valid') {
          return s.router.navigate([`user/${s.auth.getUserId()}`]);
        }
        s.getSetting(user);
      });

    this.http.get(this.domain + '/api/post?query=' + s.obj + '&skip=0', this.api.getHeaders())
      .subscribe((user: any) => {
        this.http.get(this.domain + '/api/post/count?query=' + s.obj, this.api.getHeaders())
          .subscribe((res: any) => {
            s.posts = (user);
              s.maxcount = res.count;
              s.check();
          });
      });
  }


  morePost() {
    const self = this;
    this.id = location.href.split("user/")[1];
    this.http.get(this.domain + '/api/post?query=' + this.obj + '&skip=' + this.posts.length, this.api.getHeaders())
      .subscribe((user: any) => {
        self.posts = self.posts.concat(user);
        self.check();
      });
  }

  check() {
    if (this.maxcount <= this.posts.length) {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  }

  getSetting(res) {
    const s = this;
    if (res) {
      s.user = res[0];
      //console.log(s.user);
      s.core.setValidProfile(res[1]);
      s.auth.setUserData(res);
    }
  }
}
