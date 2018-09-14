import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private domain = 'http://localhost:3000/api';
  private _signin = `${this.domain}/signin`;
  private _signup = `${this.domain}/signup`;

  constructor(
      private http: HttpClient,
      private cookieService: CookieService
  ) {

  }

  private httpOptions: { headers: HttpHeaders, withCredentials: boolean };
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
        (err: any)=>{
            console.log(err);
            swal("Error", err.error.error, "error");
            reject(err)
          }
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
            if(res && !res.err){
              resolve(res)
            }else if (res.err){
              swal("Error", res.err, "error");
              reject(res)
            }
          },
        (err: any)=>{
            if(err && err.error.error){
              swal("Error", err.error.error, "error");
              reject(err)
            }
          }
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
