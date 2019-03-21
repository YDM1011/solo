import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import {BehaviorSubject} from 'rxjs';

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

  get(api, id= null, select= null, any= null) {
    const self = this;
    if (self.global[api + (id || '') + (select || '')]) {
      return new Promise((resolve, reject) => {
        resolve(self.global[api + (id || '') + (select || '') + (any || '')]);
      });
    } else {
      return self.g(api, id, select, any);
    }

  }
  g(api, id= null, select= null, any= null) {
    const self = this;
    let   model = select ? '?select=' + select : '';
          model += any ? '&query=' + JSON.stringify(any) : '';
    return new Promise((resolve, reject) => {
      self.http.get(`${self.domain}/api/${api}${id ? '/' + id : ''}${model}`)
        .subscribe(
          (res: any) => {
            self.global[api + (id || '') + (select || '') + (any || '')] = res;
            resolve(res);
          },
          err => reject(err)
        );
    });
  }
  justGet(api, id= null, select= null) {
    const self = this;
    const model = select ? '?select=' + select : '';
    return new Promise((resolve, reject) => {
      self.http.get(`${self.domain}/api/${api}${id ? '/' + id : ''}${model}`)
        .subscribe(
          (res: any) => {
            self.global[api + (id || '') + (select || '')] = res;
            resolve(res);
          },
          err => reject(err)
        );
    });
  }

  set(api, obj, id, select= null) {
    const self = this;
    if (select) {
      const model = '?select=' + select;
      return new Promise((resolve, reject) => {
        self.http.post(`${self.domain}/api/${api}/${id}${model}`, obj)
          .subscribe(
            res => {
              // self.global[api+(id || '')+(select || '')] = res;
              self.updateDate(api, res, id, select);
              resolve(res);
            },
            err => reject(err)
          );
      });
    }
    if (!select) {
      return new Promise((resolve, reject) => {
        self.http.post(`${self.domain}/api/${api}/${id}`, obj)
          .subscribe(
            res => {
              // self.global[api+(id || '')] = res;
              self.updateDate(api, res, id, select);
              resolve(res);
            },
            err => reject(err)
          );
      });
    }

  }
  post(api, obj) {
    const self = this;
    return new Promise((resolve, reject) => {
      self.http.post(`${self.domain}/api/${api}`, obj)
        .subscribe(
          (res: any) => {
            self.global[api + (res._id || '')] = res;
            resolve(res);
          },
          err => reject(err)
        );
    });
  }
  doPost(api, obj) {
    const self = this;
    return new Promise((resolve, reject) => {
      self.http.post(`${self.domain}/api/${api}`, obj)
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          err => reject(err)
        );
    });
  }
  create(api, obj, id, select= null) {
    const self = this;
    obj['id'] = id;
    obj['model'] = select;
    return new Promise((resolve, reject) => {
      self.http.post(`${self.domain}/api/${api}`, obj)
        .subscribe(
          (res: any) => {
            self.global[api + (res._id || '') + (select || '')] = res;
            // self.createDate(api,res,res._id,select);
            resolve(res);
          },
          err => reject(err)
        );
    });
  }
  delet(api, _id, id) {
    const self = this;
    return new Promise((resolve, reject) => {
      self.http.delete(`${self.domain}/api/${api}/${_id}`)
        .subscribe(
          res => {
            if (self.global[api + (id || '')]) {
              self.global[api + (id || '')].forEach((item, i) => {
                if (item._id === _id) {
                  console.log(self.global[api + id]);
                  self.global[api + id].splice(i, 1);
                  console.log(self.global[api + id]);
                  resolve(self.global[api + id]);
                  self.updat.next([self.global[api + id], api]);
                }
              });
            }
          },
          err => reject(err)
        );
    });
  }
  doDel(api,_id){
    const self = this;
    return new Promise((resolve, reject) => {
      self.http.delete(`${self.domain}/api/${api}/${_id}`)
        .subscribe(
          res => {
            resolve(res)
          },
          err => reject(err)
        );
    });
  }
  deletSelect(api, _id, id, select, mod) {
    const self = this;
    return new Promise((resolve, reject) => {
      self.http.delete(`${self.domain}/api/${mod}/${_id}`)
        .subscribe(
          res => {
            if (self.global[api + (id || '') + (select || '')][select]) {
              self.global[api + (id || '') + (select || '')][select].forEach((item, i) => {
                if (item._id === _id) {
                  self.global[api + id + (select || '')][select].splice(i, 1);
                  resolve(self.global[api + id + (select || '')]);
                  self.updat.next([self.global[api + id + (select || '')], select]);
                }
              });
            }

          },
          err => reject(err)
        );
    });
  }
  updateDate(api, res, id, select= null) {
    const self = this;
    if (select) {
      return new Promise((resolve, reject) => {
        if (Array.isArray(self.global[api + id + select][select])) {
          self.global[api + id + select][select].forEach((item, i) => {
            if (item._id === res._id) {
              self.global[api + id + select][select][i] = res;
            }
          });
        } else if (!Array.isArray(self.global[api + id + select][select])) {
            self.global[api + id + select][select] = res;
        }
        resolve(self.global[api + id + select]);
        this.updat.next([self.global[api + id + select], select]);
      });
    } else if (!select) {
      return new Promise((resolve, reject) => {
        if (self.global[api + (id || '')]) {
          self.global[api + (id || '')].forEach((item, i) => {
            if (item._id === res._id) {
              self.global[api + id][i] = res;
            }
          });
        } else {
          return null;
        }
        resolve(self.global[api + (id || '')]);
        this.updat.next([self.global[api + (id || '')], api]);
      })
    }

  }
  createDate(api, res, id= null, select= null) {
    const self = this;
    return new Promise((resolve, reject) => {
      if (res && select) {
        self.global[api + id + select][select].push(res);
        resolve(self.global[api + id + select]);
        console.log(self.global)
        this.updat.next([self.global[api + id + select], select]);
      }
      if (res && !select) {
        if (self.global[api + (id || '') + (select || '')]){
          if (self.global[api + (id || '') + (select || '')].length>0){
            self.global[api + (id || '') + (select || '')].push(res);
          }else{
            self.global[api + (id || '') + (select || '')] = [];
            self.global[api + (id || '') + (select || '')].push(res);
          }
        }else{
          self.global[api + (id || '') + (select || '')] = [];
          self.global[api + (id || '') + (select || '')].push(res);
        }

        resolve(self.global[api + (id || '') + (select || '')]);
        console.log(self.global);
        this.updat.next([self.global[api + (id || '') + (select || '')], api]);
      }
    });
  }

  getEsts() {
    const self = this;
    return this.get('establishment', '', );
  }
}
