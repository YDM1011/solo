import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {CoreService} from "../core.service";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {FormApiService} from "../lib/form-api/form-api.service";

@Component({
  selector: 'app-top100-page',
  templateUrl: './top100-page.component.html',
  styleUrls: ['./top100-page.component.css']
})
export class Top100PageComponent implements OnInit {

  public domain: string = environment.apiDomain;
  public host: string = environment.apiDomain.split('//')[1];

  public ests:any = [];
  public id:any;
  public obj:any;

  public favorite:boolean=false;
  public thebest:boolean=false;
  public post:boolean=false;

  public sf=1;
  public sb=1;
  public sp=1;

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
  }

  apiInitial() {
    this.sortFavorite()
  }

  sortFavorite(){
    const s = this;
    s.favorite=true;
    s.thebest=false;
    s.post=false;
    s.sf *= -1;
    s.sb = 1;
    s.sp = 1;
    this.http.get(this.domain + '/api/establishment?sort={"favoriteCount":'+s.sf+'}&limit=100&skip=0', s.api.getHeaders())
      .subscribe((ests: any) => {
        s.ests = ests;
        if (s.ests.length > 0) {
          s.ests.map(item => {
            item[item._id+'favorite'] = s.checkIconActive(item.favorite);
            item[item._id+'thebest'] = s.checkIconActive(item.thebest);
          });
        }
      });
  }
  sortTheBest(){
    const s = this;
    s.favorite=false;
    s.thebest=true;
    s.post=false;
    s.sf = 1;
    s.sb *= -1;
    s.sp = 1;
    this.http.get(this.domain + '/api/establishment?sort={"thebestCount":'+s.sb+'}&limit=100&skip=0', s.api.getHeaders())
      .subscribe((ests: any) => {
        s.ests = ests;
        if (s.ests.length > 0) {
          s.ests.map(item => {
            item[item._id+'favorite'] = s.checkIconActive(item.favorite);
            item[item._id+'thebest'] = s.checkIconActive(item.thebest);
          });
        }
      });
  }
  sortPost(){
    const s = this;
    s.favorite=false;
    s.thebest=false;
    s.post=true;
    s.sf = 1;
    s.sb = 1;
    s.sp *= -1;
    this.http.get(this.domain + '/api/establishment?sort={"postCount":'+s.sp+'}&limit=100&skip=0', s.api.getHeaders())
      .subscribe((ests: any) => {
        s.ests = ests;
        if (s.ests.length > 0) {
          s.ests.map(item => {
            item[item._id+'favorite'] = s.checkIconActive(item.favorite);
            item[item._id+'thebest'] = s.checkIconActive(item.thebest);
          });
        }
      });
  }

  checkIconActive(arr){
    let s = this;
    let is = false;
    if (!arr) return;
    if (arr.length==0) return;
    arr.map(it=>{
      if(it == s.cookie.get('userid')){
        is = true;
      }
    });
    if (is) return true;
    else return false;
  }

}
