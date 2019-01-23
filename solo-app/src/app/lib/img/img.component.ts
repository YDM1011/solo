import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormApiService} from "../form-api/form-api.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit, OnChanges {

  @Input() img: any = {url: '', name: '', id: ''};
  @Input() pic: string;
  @Input() model: string;
  @Input() field: string;

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
      s.get('galery', mod.id, '').then((res: any) => {
        if (res) {
          s.pic = res.picCrop
        }
      }).catch(err=>{});
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
                resolve(res);
              },
          err => reject(err)
        );
    });
  }

}
