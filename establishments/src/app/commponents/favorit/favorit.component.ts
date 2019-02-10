import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ApiService} from '../../service/api.service';
import { CookieService } from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-favorit',
  templateUrl: './favorit.component.html',
  styleUrls: ['./favorit.component.css']
})
export class FavoritComponent implements OnInit {

  @Input() type: string;
  @Input() security = false;

  @Output() onRes: EventEmitter<any> = new EventEmitter<any>();
  @Output() onErr: EventEmitter<any> = new EventEmitter<any>();
  public res: any;
  public hits: any;
  public host: string = environment.apiDomain.split('//')[1];
  constructor(
    private api: ApiService,
    private cookie: CookieService
  ) { }

  ngOnInit() {
    console.log("type",this.type);
    const s = this;
    if (s.security) {
      if (!s.cookie.get('userid')) {
        s.onErr.emit('Need authorization');
        return;
      }
    }
    s.api.get('favorite', s.type, '').then((val: any) => {
      console.log(val);
      if (val) {
        s.res = val;
        console.log(val);
        s.onRes.emit(val);
      }
    });
    s.api.get('dishHit').then((val: any) => {
      if (val) {
        s.hits = val;
      }
    });
  }

}
