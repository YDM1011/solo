import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {environment} from "../environments/environment";
import {HttpHeaders, HttpClient} from "@angular/common/http";
import swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  private domain = environment.apiDomain;
  private _setting = `${this.domain}/api/setting`;
  private cookieService: any;

  constructor(private http: HttpClient,
              private _cookieService: CookieService,) {
  }

  private httpOptions: {headers: HttpHeaders, withCredentials: boolean};
  getHeaders(type: string = 'application/json') {
    this.httpOptions = {
      headers: new HttpHeaders(type === 'multipart/form-data' ? {} :
        {
          'Content-Type': type,
          'Authorization': this._cookieService.get('token')
        }),
      withCredentials: true
    };
    return this.httpOptions;
  }

  getSetting() {
    let self = this;
    //noinspection TypeScriptUnresolvedFunction
    let promise = new Promise((resolve, reject) => {
      self.http.get<any>(this._setting, self.getHeaders()).subscribe(
        (res: any) => {
          if (res && !res.err) {
            resolve(res)
          } else if (res.err) {
            swal("Error", res.err, "error");
            reject(res)
          }
        },
        (err: any) => {
          if (err && err.error.error) {
            swal("Error", err.error.error, "error");
            reject(err)
          }
        }
      )
    });
    return promise;
  }

  error(err) {
    try{
      if (err.error.error && !err.error.errors) {
        return swal("Error", err.error.error, "error");
      }else
      if (err.err) {
        return swal("Error", err.err, "error");
      }else
      if (err.error.message) {
        console.log(err.error.message);
        return swal("Error", err.error.message, "error");
      }
    }catch(err){}
  }
}
