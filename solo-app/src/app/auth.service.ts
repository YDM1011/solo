import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import swal from 'sweetalert2';
import {environment} from '../environments/environment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private domain = environment.apiDomain + '/api';
  private domainCoock = environment.apiDomain;
  private isProd = environment.production;
  private _signin = `${this.domain}/signin`;
  private _signup = `${this.domain}/signup`;
  private _confirm = `${this.domain}/confirm`;
  private user: any;

  private userdata = new BehaviorSubject<any>(undefined);
  public onUserData = this.userdata.asObservable();

  private auth = new BehaviorSubject<any>(undefined);
  public onAuth = this.auth.asObservable();

  constructor(
      private http: HttpClient,
      private cookieService: CookieService
  ) {

  }

  private httpOptions: { headers: HttpHeaders, withCredentials: boolean };
  getHeaders(type: string = 'application/json') {
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

  signIn(data) {
    const self = this;
    //noinspection TypeScriptUnresolvedFunction
    const promise = new Promise((resolve, reject) => {
      this.http.post<any>(this._signin, data, self.getHeaders()).subscribe(
          (res: any) => {
              // self.setToken(res);
              self.auth.next(res);
              resolve(res);
          },
        (err: any) => {
            swal('Error', err.error.error, 'error');
            reject(err);
          }
      );
    });
    return promise;
  }
  signUp(data) {
    const self = this;
    //noinspection TypeScriptUnresolvedFunction
    const promise = new Promise((resolve, reject) => {
      this.http.post<any>(this._signup, data, self.getHeaders()).subscribe(
          (res: any) => {
            if (res && !res.err) {
              resolve(res);
            } else if (res.err) {
              swal('Error', res.err, 'error');
              reject(res);
            }
          },
        (err: any) => {
            if (err && err.error.error) {
              swal('Error', err.error.error, 'error');
              reject(err);
            }
          }
        );
    });
    return promise;
  }
  signConfirm(data) {
    const self = this;
    //noinspection TypeScriptUnresolvedFunction
    const promise = new Promise((resolve, reject) => {
      this.http.post<any>(this._confirm, data, self.getHeaders()).subscribe(
          (res: any) => {
            if (res && !res.err) {
              resolve(res);
            } else if (res.err) {
              swal('Error', res.err, 'error');
              reject(res);
            }
          },
        (err: any) => {
            if (err && err.error.error) {
              swal('Error', err.error.error, 'error');
              reject(err);
            }
          }
        );
    });
    return promise;
  }
  setToken(res) {

    if (this.isProd) {
      const domain = '.' + this.domainCoock.split('.')[1];
      const sdomain = '.' + this.domainCoock.split('.')[0].split('//')[1];
      document.cookie = 'userid=' + res._id + '; path=/; domain=' + sdomain + domain;
    } else {
      const host = location.host;
      const domainParts = host.split('.');
      domainParts.shift();
      const domain = '.' + domainParts.join('.') == '.' ? host.split(':')[0] : '.' + domainParts.join('.');
      document.cookie = 'userid=' + res._id + '; path=/; domain=' + domain;
    }
    // this.cookieService.set( 'token', res.token );
    // this.cookieService.set( 'userid', res._id );
    return;
  }
  getUserId() {
      return this.cookieService.get('userid');
  }
  isAuth() {
    if (this.cookieService.get( 'userid')) {
      return true;
    } else {
      return false;
    }
  }
  setUserData(data) {
    this.userdata.next(data);
    this.user = data;
  }
  getUserData() {
    return this.user;
  }

}
