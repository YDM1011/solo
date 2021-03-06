import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  private domain = environment.apiDomain;
  private user = '';
  private _setting = `${this.domain}/api/setting`;
  private cookieService: any;
  private isValidProfile: any;
  private cl = new BehaviorSubject<any>(undefined);
  public onClick = this.cl.asObservable();
  private validProfile = new BehaviorSubject<any>(undefined);
  public onGetValid = this.validProfile.asObservable();

  constructor(private http: HttpClient,
              private _cookieService: CookieService) {
  }

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
  click(){
    this.cl.next(true);
  }
  getSetting() {
    let self = this;
    //noinspection TypeScriptUnresolvedFunction
    let promise = new Promise((resolve, reject) => {
      self.http.get<any>(this._setting, self.getHeaders()).subscribe(
        (res: any) => {
          if (res && !res.err) {
            self.setValidProfile(res[1]);
            resolve(res);
          } else if (res.err) {
            swal("Error", res.err, "error");
            reject(res);
          }
        },
        (err: any) => {
          if (err && err.error.error) {
            swal("Error", err.error.error, "error");
            reject(err)
          }
        }
      );
    });
    return promise;
  }
  doGet(api) {
    let self = this;
    //noinspection TypeScriptUnresolvedFunction
    let promise = new Promise((resolve, reject) => {
      self.http.get<any>(`${this.domain}/api/${api}`, self.getHeaders()).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err: any) => {
          if (err && err.error.error) {
            swal("Error", err.error.error, "error");
            reject(err)
          }
        }
      );
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
  setValidProfile(bool){
    this.isValidProfile = bool;
    this.validProfile.next(bool);
  }

}
