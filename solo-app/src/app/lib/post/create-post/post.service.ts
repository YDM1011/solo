import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private setting = new BehaviorSubject<any>(undefined);
  public onSetting = this.setting.asObservable();

  constructor(
    private http:  HttpClient,
    private cookie: CookieService
  ) { }

  getEst() {
    // const self = this;
    // //noinspection TypeScriptUnresolvedFunction
    // return new Promise((resolve, reject) => {
    //   self.api.justGet(`establishment?query={}&populate={"path":"av"}`)
    //     .then((res: any) => {
    //       if (res) {
    //         resolve(res);
    //       }
    //     }, err => {
    //       console.log(err);
    //     });
    // });
  }

  getFriend() {
    // const self = this;
    // //noinspection TypeScriptUnresolvedFunction
    // return new Promise((resolve, reject) => {
    //   self.api.get(`get_friend`)
    //     .then((res: any) => {
    //       if (res) {
    //         resolve(res.myFriends);
    //       }
    //     }, err => {
    //       console.log(err);
    //     });
    // });
  }

  savePost(obj) {
    // const self = this;
    // //noinspection TypeScriptUnresolvedFunction
    // return new Promise((resolve, reject) => {
    //   self.api.post(`post`,obj)
    //     .then((res: any) => {
    //       if (res) {
    //         resolve(res);
    //       }
    //     }, err => {
    //       console.log(err);
    //     });
    // });
  }

  pushPost(post) {
    // this.setting.next(post);
  }
}
