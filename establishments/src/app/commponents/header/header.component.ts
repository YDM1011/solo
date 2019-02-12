import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';
import {ApiService} from "../../service/api.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        right: '0'
      })),
      state('closed', style({
        right: '-100%'
      })),
      transition('closed => open', [
        animate('300ms ease-out')
      ]),
      transition('open => closed', [
        animate('200ms ease-out')
      ])

    ])
  ]
})
export class HeaderComponent implements OnInit {

  public id: any;
  public user: any;
  public access = false;
  public host: string = environment.apiDomain;
  public arrayEts: any = [];
  public friends: any = [];
  public arrEts: any = [];
  public searchText = '';
  public popPreProd: boolean = false;
  constructor(
    private cookie: CookieService,
    private api: ApiService) { }

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
  goSearch(e){
    let s = this;
    console.log(e);
    if(e){
      this.api.get('search?search="'+e+'"')
        .then((res: any) => {
          s.friends = res.users;
          s.arrEts = res.est;
        });
    }
  }
}
