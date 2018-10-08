import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any;
  private img: any = [];
  private domain = environment.apiDomain;
  private _avatar = `${this.domain}/api/avatar/`;
  private userdata = new BehaviorSubject<any>(undefined);
  public onUserData = this.userdata.asObservable();
  private avatar = new BehaviorSubject<any>(undefined);
  public onAvatar = this.avatar.asObservable();
  constructor(
    private http: HttpClient,
    private _cookieService: CookieService
  ) { }
  private httpOptions: {headers: HttpHeaders, withCredentials: boolean};
  getHeaders(type: string = 'application/json') {
    this.httpOptions = {
      headers: new HttpHeaders(type === 'multipart/form-data' ? {
          'Authorization': this._cookieService.get('token')
        } :
        {
          'Content-Type': type,
          'Authorization': this._cookieService.get('token')
        }),
      withCredentials: true
    };
    return this.httpOptions;
  }

  setUserData(data){
    let self = this;
    if (!data.photo) return;
    if (data.photo._id){
    this.userdata.next(data);
    this.user = data;
    this.avatar.next(self.user.photo);
    console.log(this.user);

      if (!self.img[self.user.photo._id]){
        self.http.get<any>(this._avatar+this.user.photo._id,
          self.getHeaders()).subscribe(
          (res: any) => {
            self.img[self.user.photo._id] = res;
            this.avatar.next(self.img[self.user.photo._id]);
          });
      }else{
        this.avatar.next(self.img[self.user.photo._id])
      }
    }
    // console.log(data);
  }
  setImg(img, type = 'imgMin'){
    let self = this;
    if(img._id){
      if(!this.img[img._id+type]){
        //noinspection TypeScriptUnresolvedFunction
        return new Promise((resolve, reject) => {
          self.http.get<any>(this._avatar+img._id+'?select='+type, self.getHeaders())
            .subscribe(
              (res: any) => {this.img[img._id+type] = res; resolve(res)},
              (err: any) => {reject(err)}
            )
        })
      }else{
        //noinspection TypeScriptUnresolvedFunction
        return new Promise((resolve, reject) => {
          resolve(this.img[img._id+type])
        })
      }
    }else{
      //noinspection TypeScriptUnresolvedFunction
      return new Promise((resolve, reject) => {
        reject(new Error('not found id'))
      })
    }


  }
  getImg(){
    return this.img;
  }
}
