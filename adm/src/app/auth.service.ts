import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  private auth = new BehaviorSubject<any>(null);
  public onAuth = this.auth.asObservable();
  private domain = environment.apiDomain + '/api';
  public _signin = `${this.domain}/adm/signin`;

  isAuth() {
    if (this.cookieService.get( 'adminid')) {
      return true;
    } else {
      return false;
    }
  }
  signIn(data) {
    const self = this;
    //noinspection TypeScriptUnresolvedFunction
    const promise = new Promise((resolve, reject) => {
      this.http.post<any>(this._signin, data).subscribe(
        (res: any) => {
          // self.setToken(res);
          self.auth.next(res);
          resolve(res);
        },
        (err: any) => {
          console.log(err);
          alert(err.error.error);
          reject(err);
        }
      );
    });
    return promise;
  }
}
