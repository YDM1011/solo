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
        animate('250ms ease-out')
      ]),
      transition('open => closed', [
        animate('180ms ease-out')
      ])

    ])
  ]
})
export class HeaderComponent implements OnInit {

  public id: any;
  public user: any;
  public access = false;
  public loaded = false;
  public host: string = environment.apiDomain;
  public arrayEts: any = [];
  public friends: any = [];
  public arrEts: any = [];
  public searchText = '';
  public count;
  public me;
  public basketId;
  public popPreProd: boolean = false;
  public isOnline: boolean = false;
  constructor(
    private cookie: CookieService,
    private api: ApiService) { }

  ngOnInit() {
    this.id = this.cookie.get('userid');
    this.api.onOnline.subscribe(v=>{
      if(v){
        this.basketId = v._id;
        this.isOnline = v.isOnline;
        this.api.justGet('basketsList?count={"$and":[{"$or":[{"status":{"$nin":["6","7"]}}]},{"ownerest":"'+v._id+'"},{"owneruser":"'+this.id+'"}]}').then((count:any)=>{
        // this.api.justGet('basketsList?count={"ownerest":"'+v._id+'"}').then((count:any)=>{
          this.count = count.count
        })
      }
    });
    this.api.onBascketCount.subscribe(v=>{
      if(v){
        this.api.justGet('basketsList?count={"$and":[{"$or":[{"status":{"$nin":["6","7"]}}]},{"ownerest":"'+this.basketId+'"},{"owneruser":"'+this.id+'"}]}').then((count:any)=>{
          this.count = count.count
        })
      }
    });
    // this.api.onMe.subscribe(me=>{
    //   alert(me)
    //   this.me = me;
    // })

  }
  forbidden(mes) {
    const s = this;
    s.access = false;
  }
  result(data) {
    const s = this;
    s.api.curentUserData(data);
    s.user = (data);
    s.loaded = true;
    s.access = true;
  }
  goSearch(e){
    let s = this;
    if(e){
      this.api.get('search?search="'+e+'"')
        .then((res: any) => {
          s.friends = res.users;
          s.arrEts = res.est;
        });
    }
  }
}
