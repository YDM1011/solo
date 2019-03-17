import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {CoreService} from "../core.service";
import {HttpClient} from "@angular/common/http";
import {FormApiService} from "../lib/form-api/form-api.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-friend-offer-page',
  templateUrl: './friend-offer-page.component.html',
  styleUrls: ['./friend-offer-page.component.css']
})
export class FriendOfferPageComponent implements OnInit {

  public domain: string = environment.apiDomain;

  public friends:any;
  public invite:any;
  public id:any;
  public meOffer:boolean=true;
  public myOffer:boolean=false;
  public isAll:boolean=false;
  public obj:any;
  public mutual:any = [];
  public mutualEst:any = [];
  public people:any = [];
  public sortV = false;
  public sortEV = false;
  public sortPV = false;
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
    s.apiInitial();
    s.route.params.subscribe((params: any) => {
      s.apiInitial();
    });
  }

  apiInitial() {
    const s = this;
    this.http.get(this.domain + '/api/getFriendsOffer', s.api.getHeaders())
      .subscribe((friends: any) => {
        if(friends){
          s.friends = (friends.offer);
          s.meOffer = true;
        }
      });
    this.http.get(this.domain + '/api/getFriendsInvite', s.api.getHeaders())
      .subscribe((friends: any) => {
        if(friends){
          s.invite = (friends.invite);
        }
      });
    this.http.get(this.domain + '/api/getPotentialFriend', s.api.getHeaders())
      .subscribe((friends: any) => {
        if(friends){
          s.people = (friends);
        }
      });
  }

  setMutual(res,us) {
    this.mutual[res.id] = res.mutual;
    this.mutualEst[res.id] = res.mutualEst ? res.mutualEst : [];
    let m = res.mutual || [];
    let me = res.mutualEst || [];
    if (us){
      us["mutualCount"] = m.length + me.length;
      if (us._id == this.cookie.get('userid')){us.mutualCount = -1}
    }
  }
  more(res) {
    this.people = res;
  }

  checkTab(ind){
    let s = this;
    switch (ind) {
      case 1:{
        s.meOffer = true;
        s.myOffer = false;
        s.isAll   = false;
        break
      }
      case 2:{
        s.meOffer = false;
        s.myOffer = true;
        s.isAll   = false;
        break
      }
      case 3:{
        s.meOffer = false;
        s.myOffer = false;
        s.isAll   = true;
        break
      }
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
