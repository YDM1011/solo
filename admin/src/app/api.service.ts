import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private domain: string = environment.apiDomain;
  private global: any = [];

  private updat = new BehaviorSubject<any>(null);
  public onUpDate = this.updat.asObservable();

  private image = new BehaviorSubject<any>(null);
  public onImg = this.image.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  get(api, id=null, select=null){
    let self = this;
    console.log(self.global);
    if (self.global[api+(id || '')+(select || '')]) {
      return new Promise((resolve, reject) => {
        resolve(self.global[api+(id || '')+(select || '')]);
      });
    }else{
      return self.g(api, id, select);
    }

  }
  g(api, id=null, select=null){
    let self = this;
    let model = select ? '?select='+select : '';
    return new Promise((resolve, reject) => {
      self.http.get(`${self.domain}/api/${api}${id ? '/'+id : ''}${model}`)
        .subscribe(
          (res:any) => {
            self.global[api + (id || '') + (select || '')] = res;
            resolve(res);
            if (res[0]){
              if (res[0].pic){
                res.map(obj=>{
                  if(obj.pic){
                    self.gImg('avatar', obj.pic._id, api, id, select);
                  }
                });
              }
            }
          },
          err => reject(err)
        );
    });
  }
  gImg(apiImg, idImg, api, id=null, select=null){
    let self = this;
    let model = `?select=larg,preload`;
    self.http.get(`${self.domain}/api/${apiImg}/${idImg}${model}`)
      .subscribe(
        (res:any) => {
          if(Array.isArray([])){
            self.global[api + (id || '') + (select || '')].map(item=>{
              if(item.pic._id == res._id){
                item.pic = res;
              }
            })
          }else{
            self.global[api + (id || '') + (select || '')].pic = res;
          }
          self.image.next(Object.assign({},res));
        },
        err => {});
  }
  set(api,obj,id,select=null){
    let self = this;
    if (select){
      let model = '?select='+select;
      return new Promise((resolve, reject) => {
        self.http.post(`${self.domain}/api/${api}/${id}${model}`, obj)
          .subscribe(
            res => {
              // self.global[api+(id || '')+(select || '')] = res;
              self.updateDate(api,res,id,select);
              resolve(res)
            },
            err => reject(err)
          );
      });
    }
    if(!select){
      return new Promise((resolve, reject) => {
        self.http.post(`${self.domain}/api/${api}/${id}`, obj)
          .subscribe(
            res => {
              // self.global[api+(id || '')] = res;
              self.updateDate(api,res,id,select);
              resolve(res)
            },
            err => reject(err)
          );
      });
    }

  }
  create(api,obj,id,select=null){
    let self = this;
    obj['id']=id;
    obj['model']=select;
    return new Promise((resolve, reject) => {
      self.http.post(`${self.domain}/api/${api}`, obj)
        .subscribe(
          (res:any) => {
            self.global[api + (res._id || '') + (select || '')] = res;
            // self.createDate(api,res,res._id,select);
            resolve(res)
          },
          err => reject(err)
        );
    });
  }
  delet(api,_id,id){
    let self = this;
    return new Promise((resolve, reject) => {
      self.http.delete(`${self.domain}/api/${api}/${_id}`)
        .subscribe(
          res => {
            if (self.global[api+(id || '')]){
              self.global[api+(id || '')].forEach((item,i)=>{
                if (item._id == _id){
                  console.log(self.global[api+id]);
                  self.global[api+id].splice(i, 1);
                  console.log(self.global[api+id]);
                  resolve(self.global[api+id]);
                  self.updat.next([self.global[api+id], api])
                }
              });
            }

          },
          err => reject(err)
        );
    });
  }
  deletSelect(api,_id,id,select,mod){
    let self = this;
    return new Promise((resolve, reject) => {
      self.http.delete(`${self.domain}/api/${mod}/${_id}`)
        .subscribe(
          res => {
            if (self.global[api+(id || '')+(select || '')][select]){
              self.global[api+(id || '')+(select || '')][select].forEach((item,i)=>{
                if (item._id == _id){
                  self.global[api+id+(select || '')][select].splice(i, 1);
                  resolve(self.global[api+id+(select || '')]);
                  self.updat.next([self.global[api+id+(select || '')], select])
                }
              });
            }

          },
          err => reject(err)
        );
    });
  }
  updateDate(api,res,id,select=null){
    let self = this;
    if (select){
      return new Promise((resolve, reject) => {
        if (Array.isArray(self.global[api+id+select][select])){
          self.global[api+id+select][select].forEach((item,i)=>{
            if (item._id == res._id){
              self.global[api+id+select][select][i]=res;
            }
          });
        }else if(!Array.isArray(self.global[api+id+select][select])){
            self.global[api+id+select][select]=res;
        }

        resolve(self.global[api+id+select]);
        this.updat.next([self.global[api+id+select], select])
      });
    }else if(!select){
      return new Promise((resolve, reject) => {
        if (self.global[api+(id || '')]){
          self.global[api+(id || '')].forEach((item,i)=>{
            if (item._id == res._id){
              self.global[api+id][i]=res;
            }
          });
        }else{
          return null;
        }

        resolve(self.global[api+(id || '')]);
        this.updat.next([self.global[api+(id || '')], api])
      });
    }

  }
  createDate(api,res,id=null,select=null){
    let self = this;
    return new Promise((resolve, reject) => {
      if (res && select){
        self.global[api+id+select][select].push(res);
        resolve(self.global[api+id+select]);
        this.updat.next([self.global[api+id+select], select])
      }
      if(res && !select){
        self.global[api+(id || '')+(select || '')] = (res);
        resolve(self.global[api+(id || '')+(select || '')]);
        this.updat.next([self.global[api+(id || '')+(select || '')], api])
      }
    });
  }

  getEsts(... select){
    let self = this;
    let model = select ? '?select='+select : '';
    return this.get('establishment','',select);
  }
}
