import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {FormApiService} from "../form-api/form-api.service";
import {CookieService} from "ngx-cookie-service";


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private setting = new BehaviorSubject<any>(undefined);
  public onSetting = this.setting.asObservable();

  private domain: string = environment.apiDomain;

  constructor(
    private http:  HttpClient,
    private api: FormApiService,
    private cookie: CookieService
  ) { }

  getEst() {
    const self = this;
    //noinspection TypeScriptUnresolvedFunction
    return new Promise((resolve, reject) => {
      self.http.get(`${this.domain}/api/establishment?query={}&populate={"path":"av"}`,  self.api.getHeaders())
        .subscribe((res: any) => {
          if (res) {
            resolve(res);
          }
        }, err => {
          console.log(err);
        });
    });
  }

  getFriend() {
    const self = this;
    //noinspection TypeScriptUnresolvedFunction
    return new Promise((resolve, reject) => {
      self.http.get(`${this.domain}/api/get_friend`,  self.api.getHeaders())
        .subscribe((res: any) => {
          if (res) {
            resolve(res.myFriends);
          }
        }, err => {
          console.log(err);
        });
    });
  }

  pushPost(post) {
    this.setting.next(post);
  }
}
