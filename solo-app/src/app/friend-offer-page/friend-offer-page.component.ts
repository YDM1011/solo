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
  public people:any = [];

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
  }

  setMutual(res) {
    this.mutual[res.id] = res.mutual;
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
}
