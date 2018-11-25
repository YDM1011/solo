import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ApiService} from "../../service/api.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-favorit',
  templateUrl: './favorit.component.html',
  styleUrls: ['./favorit.component.css']
})
export class FavoritComponent implements OnInit {

  @Input() type:string;
  @Input() security:boolean = false;

  @Output() onRes: EventEmitter<any> = new EventEmitter<any>();
  @Output() onErr: EventEmitter<any> = new EventEmitter<any>();
  public res:any;
  constructor(
    private api: ApiService,
    private cookie: CookieService
  ) { }

  ngOnInit() {
    let s = this;
    if (s.security){
      if(!s.cookie.get('userid')){
        s.onErr.emit('Need authorization');
        return;
      }
    }
    s.api.get('favorite', s.type, '').then((val:any)=>{
      if(val){
        s.res = val;
        s.onRes.emit(val)
      }
    })
  }

}
