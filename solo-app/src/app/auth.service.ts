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
  private headers = new Headers();
  constructor(
      private http: HttpClient,
      private cookieService: CookieService
  ) {

  }
  // 'Authorization': 'my-auth-token'
  getHeaders(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };
    return httpOptions;
  }

  signIn(data){
    var self = this;
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
