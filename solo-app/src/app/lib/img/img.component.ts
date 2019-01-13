import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {environment} from "../../../../../establishments/src/environments/environment";
import {HttpClient} from "@angular/common/http";
import {FormApiService} from "../form-api/form-api.service";

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit, OnChanges {

  @Input() img: any = {url: '', name: '', id: ''};
  @Input() pic: string;
  private domain: string = environment.apiDomain;
  private global: any = [];

  private id: any;
  constructor(
    private http: HttpClient,
    private api: FormApiService
  ) { }

  ngOnInit() {
    const s = this;
    s.initApi(s.img);
  }
  ngOnChanges(){
    const s = this;
    s.initApi(s.img);
  }

  initApi(mod) {
    const s = this;
    if (mod.id && !mod.url && !mod.name) {
      let query = '?select=preload,_id';
      query += '&query=' + JSON.stringify({_id: mod.id});
      s.get('avatar', mod.id, '', query).then((res: any) => {
        if (res) {
          s.pic = res.larg || res.preload;
          if (!res.larg) {
            s.getAndUpdate('avatar', mod.id, '', '').then((res: any) => {
              if (res) {
                s.pic = res.larg;
              }
            });
          }
        }
      });
    } else if (!mod.id && mod.url && mod.name) {
      const query = '?populate=' + JSON.stringify({path: mod.name, select: '_id preload'}) + '&select=' + mod.name;
      const query2 = '?populate=' + JSON.stringify({path: mod.name, select: '_id larg'}) + '&select=' + mod.name;
      s.get(mod.url, mod.name, '', query).then((val: any) => {
        if (val) {
          console.log(query, val);
          s.pic = val[mod.name].preload;
          s.getAndUpdate(mod.url, mod.name, '', query2).then((res: any) => {
            if (res) {
              s.pic = res[mod.name].larg;
            }
          });
        }
      });
    }
  }


  get(api, id= null, select= null, model= null) {
    const self = this;
    if (self.global[api + (id || '') + (select || '')]) {
      return new Promise((resolve, reject) => {
        resolve(self.global[api + (id || '') + (select || '')]);
      });
    } else {
      return self.getAndUpdate(api, id, select, model);
    }
  }
  getAndUpdate(api, id= null, select= null, model= null) {
    const self = this;
    return new Promise((resolve, reject) => {
      self.http.get(`${self.domain}/api/${api}${id ? '/' + id : ''}${model ? model : ''}`, this.api.getHeaders())
        .subscribe(
          (res: any) => {
            self.global[api + (id || '') + (select || '')] = res;
            if (id === 'av') {
              if (res.av.larg) {  }
            }
            resolve(res);
          },
          err => reject(err)
        );
    });
  }

}
