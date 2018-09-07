import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Headers} from "@angular/http";
import {HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private domain = 'http://localhost:3000/api';
  private _signin = `${this.domain}/signin`;
  private _signup = `${this.domain}/signup`;
  private headers = new Headers();

  constructor(
      private http: HttpClient,
      private cookieService: CookieService
  ) {

  }

  private httpOptions: { headers: HttpHeaders, withCredentials: boolean };
  // 'Authorization': 'my-auth-token'
  getHeaders(type:string = 'application/json'){
    this.httpOptions = {
      headers: new HttpHeaders(type === 'multipart/form-data' ? {} :
        {
          'Content-Type': type,
          'Authorization': this.cookieService.get('token')
        }),
      withCredentials: true
    };
    return this.httpOptions;
  }

  signIn(data){
    let self = this;
    //noinspection TypeScriptUnresolvedFunction
    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(this._signin, data, self.getHeaders()).subscribe(
          (res: any)=>{
              self.setToken(res.res);
              resolve(res.res)
          },
          err=>reject(err)
      )
    });
    return promise;
  }
  signUp(data){
    let self = this;
    //noinspection TypeScriptUnresolvedFunction
    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(this._signup, data, self.getHeaders()).subscribe(
          (res: any)=>{
            resolve(res)
          },
          err=>reject(err)
      )
    });
    return promise;
  }
  setToken(token){
    this.cookieService.set( 'token', token );
    return
  }
  isAuth(){
    if(this.cookieService.get( 'token')){
      return true
    }else{
      return false
    }

  }

}
