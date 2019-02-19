import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {CoreService} from "../core.service";
import {HttpClient} from "@angular/common/http";
import {FormApiService} from "../lib/form-api/form-api.service";
import {ApiService} from "../service/api.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-like-est-page',
  templateUrl: './like-est-page.component.html',
  styleUrls: ['./like-est-page.component.css']
})
export class LikeEstPageComponent implements OnInit {

  public domain: string = environment.apiDomain;
  public host: string = environment.apiDomain.split('//')[1];

  public ests:any = [];
  public id:any;
  public obj:any;
  public isHome = true;
  public thebest: any;
  public workTime;
  public favorite: any;
  public pics: any;
  public name: any;
  public user: any;
  public isFav:boolean=false;
  public isBest:boolean=false;
  public isChangeEstPop:boolean=false;
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private cookie: CookieService,
    private core: CoreService,
    private apiService: ApiService,
    private http:  HttpClient,
    private router: Router,
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
    this.http.get(this.domain + '/api/getLikeEsts/all/' + idc, s.api.getHeaders())
      .subscribe((ests: any) => {
        s.ests = ests
      });
  }
  verifyLike(val){
    let s = this;
    if (val.mes == 'checked'){
      s.isChangeEstPop = true;
      s.hidden();
    }else if(val.length > 0){
      s.thebest = val;
      s.isBest = s.checkIconActive(s.thebest);
    }
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
  setFavorite(arg) {
    const s = this;
    this.apiService.post('favorite', {key: arg}).then((val: any) => {
      switch (arg) {
        case'oneest':{
          s.verifyLike(val);
          break;
        }
        case'est':{
          s.favorite = val;
          s.isFav = this.checkIconActive(s.favorite);
          break;
        }
      }

    });
  }

}
