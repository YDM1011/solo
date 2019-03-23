import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {CoreService} from "../core.service";
import {HttpClient} from "@angular/common/http";
import {FormApiService} from "../lib/form-api/form-api.service";
import {environment} from "../../environments/environment";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-friend-page',
  templateUrl: './friend-page.component.html',
  styleUrls: ['./friend-page.component.css']
})
export class FriendPageComponent implements OnInit, OnChanges {

  public domain: string = environment.apiDomain;

  public isFriends = false;
  public friends:any;
  public id:any;
  public obj:any;
  public populate:any = JSON.stringify({path:'photo', select:'preload _id'});
  public mutual:any = [];
  public mutualEst:any = [];
  public people:any = [];
  public sortV = false;
  public sortEV = false;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private core: CoreService,
    private http:  HttpClient,
    private router: Router,
    private cookie: CookieService,
    private api: FormApiService
  ) { }
  ngOnChanges() {}
  ngOnInit() {
    const s = this;
    s.id = location.href.split("user/")[1].split("/")[0];
    s.obj = JSON.stringify({id: s.id});

    s.route.params.subscribe((params: any) => {
      s.id = location.href.split("user/")[1].split("/")[0];
      s.obj = JSON.stringify({id: s.id});
      s.apiInitial(s.id);
    });
  }

  apiInitial(idc) {
    const s = this;
    this.http.get(this.domain + '/api/getFriends?userId=' + idc, s.api.getHeaders())
      .subscribe((friends: any) => {
        s.friends = friends;
        s.friends.myFriends = friends.myFriends.reverse();
        // this.friends.myFriends = s.sortArr(this.friends.myFriends);
        s.getMutualFriends(idc);
        s.isFriends = true;
      });
    s.http.get(`${this.domain}/api/getMutualFriends/${idc}`, s.api.getHeaders())
      .subscribe((res: any) => {
        if (res) {
          // s.friends = (res);
          console.log(res);
          // s.people = res;
          s.people = res.reverse();
        }
      }, err => {
      });
  }

  getMutualFriends(userId){
    let s = this;
    if(s.isFriends){
      s.isFriends = false;
      s.http.get(`${this.domain}/api/getMutualFriends/${userId}`, s.api.getHeaders())
        .subscribe((res: any) => {
          if (res) {
            // s.friends = (res);
            console.log(res);
            s.people = res;
          }
        }, err => {
        });
    }

  }

  setMutual(res, us) {
    this.mutual[res.id] = res.mutual;
    this.mutualEst[res.id] = res.mutualEst;
    let m = res.mutual || [];
    let me = res.mutualEst || [];
    if (us){
      us["mutualCount"] = m.length + me.length;
      if (us._id == this.cookie.get('userid')){us.mutualCount = -1}
    }
  }


  sortArr(arr, mod = ''){
    this[mod] = !this[mod];
    let s = this;
    console.log(this[mod]);
    if (arr){
      arr.sort(function (a, b) {
        if (s[mod]){
          return a.mutualCount - b.mutualCount;
        }else{
          return b.mutualCount - a.mutualCount;
        }
      });
      return arr;
    }else{
      return arr
    }
  }
}
