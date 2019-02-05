import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {FormApiService} from "../form-api/form-api.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private domain: string = environment.apiDomain;
  private isinvite = new BehaviorSubject<any>(null);
  public onInvite = this.isinvite.asObservable();
  constructor(
    private http:  HttpClient,
    private api: FormApiService
  ) { }

  checkInvite(userId){
    let self = this;
    //noinspection TypeScriptUnresolvedFunction
    return new Promise((resolve, reject) => {
      self.http.post(`${this.domain}/api/isInvite`, {userId: userId}, self.api.getHeaders())
        .subscribe((res: any) => {
          if (res) {
            let obj = {
              user: userId,
              isInvite: res.isInvite,
              isMeet: res.isMeet,
              isFriend: res.isFriend
            };
            self.isinvite.next(obj);
            resolve(obj);
          }
        }, err => {
        });
    });
  }
  meetFriend(userId){
    let self = this;
    //noinspection TypeScriptUnresolvedFunction
    return new Promise((resolve, reject) => {
      self.http.post(`${this.domain}/api/meetFriend`, {userId: userId}, self.api.getHeaders())
        .subscribe((res: any) => {
          if (res) {
            resolve(res.isInvite);
          }
        }, err => {
        });
    })
  }
  offerFriend(userId){
    let self = this;
    //noinspection TypeScriptUnresolvedFunction
    return new Promise((resolve, reject) => {
      self.http.post(`${this.domain}/api/offerFriend`, {userId: userId}, self.api.getHeaders())
        .subscribe((res: any) => {
          if (res) {
            resolve(res.isInvite);
          }
        }, err => {
        });
    })
  }
  delMeetFriend(userId){
    let self = this;
    //noinspection TypeScriptUnresolvedFunction
    return new Promise((resolve, reject) => {
      self.http.post(`${this.domain}/api/delMeetFriend`, {userId: userId}, self.api.getHeaders())
        .subscribe((res: any) => {
          if (res) {
            resolve(res.isInvite);
          }
        }, err => {
        });
    })
  }
  addFriend(userId){
    let self = this;
    //noinspection TypeScriptUnresolvedFunction
    return new Promise((resolve, reject) => {
      self.http.post(`${this.domain}/api/addFriend`, {userId: userId}, self.api.getHeaders())
        .subscribe((res: any) => {
          if (res) {
            resolve(res.isInvite);
          }
        }, err => {
        });
    })
  }
  delFriend(userId){
    let self = this;
    //noinspection TypeScriptUnresolvedFunction
    return new Promise((resolve, reject) => {
      self.http.post(`${this.domain}/api/delFriend`, {userId: userId}, self.api.getHeaders())
        .subscribe((res: any) => {
          if (res) {
            resolve(res.isInvite);
          }
        }, err => {
        });
    })
  }
  delOffer(userId){
    let self = this;
    //noinspection TypeScriptUnresolvedFunction
    return new Promise((resolve, reject) => {
      self.http.post(`${this.domain}/api/delOffer`, {userId: userId}, self.api.getHeaders())
        .subscribe((res: any) => {
          if (res) {
            resolve(res.isInvite);
          }
        }, err => {
        });
    })
  }
}
