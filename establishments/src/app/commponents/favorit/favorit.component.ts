import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {ApiService} from '../../service/api.service';
import { CookieService } from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-favorit',
  templateUrl: './favorit.component.html',
  styleUrls: ['./favorit.component.css']
})
export class FavoritComponent implements OnInit, OnChanges {

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
    const s = this;
    if (s.security) {
      if (!s.cookie.get('userid')) {
        s.onErr.emit('Need authorization');
        return;
      }
    }
    if (s.type != 'hit')
    s.api.get('favorite', s.type, '').then((val: any) => {
      if (val) {
        s.res = val;
        s.onRes.emit(val);
      }
    }).catch(e=>{});
    else
    s.api.get('dishHit').then((val: any) => {
      if (val) {
        s.hits = val;
      }
    });
  }

  ngOnChanges(){}
}
