import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private domain: string = environment.apiDomain;

  constructor(
    private http: HttpClient,
  ) { }

  apiGet(api, id=null, model=null){
    let s = this;
    return new Promise((resolve, reject) => {
      s.http.get(`${s.domain}/api/${api}${id ? '/' + id : ''}${model ? model : ''}`)
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          err => reject(err)
        );
    })
  }

  apiPost(api, obj, id='', model=''){
    let s = this;
    if (!id){
      id = obj._id ? obj._id : '';
    }

    return new Promise((resolve, reject) => {
      s.http.post(`${s.domain}/api/${api}${id ? '/' + id : ''}${model ? model : ''}`, obj)
        .subscribe(
          res => {
            resolve(res);
          },
          err => reject(err)
        );
    });
  }

  apiDel(api, id=''){
    let s = this;
    return new Promise((resolve, reject) => {
      s.http.delete(`${s.domain}/api/${api}${id ? '/' + id : ''}`)
        .subscribe(
          res => {
            resolve(res);
          },
          err => reject(err)
        );
    });
  }

}
