import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ApiService} from "../../service/api.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-custom-res',
  templateUrl: './custom-res.component.html',
  styleUrls: ['./custom-res.component.css']
})
export class CustomResComponent implements OnInit {

  @Input() model:any = {
    url:'',
    params:'',
    query:'',
    populate:'',
    select: '',
    security: false
  };
  @Output() onRes: EventEmitter<any> = new EventEmitter<any>();
  @Output() onErr: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private api: ApiService,
    private cookie: CookieService
  ) { }

  ngOnInit() {
    let s = this;
    s.initApi(s.model);
  }

  initApi(mod){
  let s = this;
  if (mod.security){
    if(!s.cookie.get('userid')){
      s.onErr.emit('Need authorization');
      return;
    }
  }
  let as = '&';
  let ap = '&';
  let aq = '&';
  if (mod.select){as = '?'}
  if(mod.populate && !mod.select){as = ''; ap = '?'}
  if(mod.query && !mod.select && !mod.populate){ap = '', as = ''; aq = '?'}
  if(!mod.query && !mod.select && !mod.populate){ap = '', as = ''; aq = ''}
  if(!mod.query){aq = ''}
  if(!mod.populate){ap = ''}
  if(!mod.select){as = ''}
    let query = as + (mod.select ? 'select='+(mod.select): '');
        query += ap + (mod.populate ? 'populate='+JSON.stringify(mod.populate): '');
        query += aq + (mod.query ? 'query='+JSON.stringify(mod.query): '');
    s.api.get(mod.url, mod.params, query, query).then((val:any)=>{
      if(val){
        s.onRes.emit(val)
      }
    })
  }
}
