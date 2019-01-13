import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../../environments/environment";
import {CoreService} from "../../core.service";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private domain = environment.apiDomain;
  constructor(
    private http: HttpClient,
    private cookieService:CookieService,
    private core: CoreService
  ) { }
  private httpOptions: { headers: HttpHeaders, withCredentials: boolean };
  getHeaders(type:string = 'application/json'){
    this.httpOptions = {
      headers: new HttpHeaders(type === 'multipart/form-data' ? {
          'Authorization': this.cookieService.get('token')
        } :
        {
          'Content-Type': type,
          'Authorization': this.cookieService.get('token')
        }),
      withCredentials: true
    };
    return this.httpOptions;
  }
  uploadAvatar(formData: any, i) {
    const self = this;
    this.cookieService.get('token');
    const options = this.getHeaders('application/json');
//noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
    return new Promise(function(resolve, reject) {
      formData.id = self.cookieService.get('userid');
      console.log(formData);
      self.http.post(`${self.domain}/api/uploadImage`,
        formData,
        options).subscribe(
        res => {self.core.error(res); resolve({res,i})},
        err => {self.core.error(err); reject(err)}
      );
    });
  }
}
