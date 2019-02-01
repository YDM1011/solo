import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public id: any;
  public user: any;
  public access = false;
  public host: string = environment.apiDomain;
  public arrayEts: any = [];
  public searchText = '';
  public popPreProd: boolean = false;
  constructor(private cookie: CookieService) { }

  ngOnInit() {
    this.id = this.cookie.get('userid');
  }
  forbidden(mes) {
    const s = this;
    s.access = false;
  }
  result(data) {
    const s = this;
    s.user = (data);
    s.access = true;
  }
}
