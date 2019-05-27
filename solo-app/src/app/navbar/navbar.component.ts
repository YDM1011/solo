import {Component, OnInit, Input, EventEmitter, Output, AfterViewInit, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../lib/user/user.service';
import {CoreService} from '../core.service';
import {environment} from '../../environments/environment';
import {FormApiService} from '../lib/form-api/form-api.service';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
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
export class NavbarComponent implements OnInit, OnDestroy {
  public friends = [];
  public arrEts = [];
  public userId: string;
  public userPhoto: any;
  public userName: string;
  public activSearch = false;
  public isShow = false;
  public domain: string = environment.apiDomain;
  public count = 0;
  public countBaskets = 0;
  public limit = 4;
  public offerCount;
  public posts = [];
  public mobile;
  public email;
  public me;
  public entity;
  public baskets;
  public isLoaded = false;
  @Input() word;
  @Output() onClick = new EventEmitter<any>();
  @Output() onNew: EventEmitter<any> = new EventEmitter<any>();
  private httpOptions: {
    headers: HttpHeaders,
    withCredentials: boolean };
  private maxcount: number;

  // 'Authorization': 'my-auth-token'
  getHeaders() {
    const self = this;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': self.cookieService.get('token')
        }),
      withCredentials: true
    };
    return this.httpOptions;
  }
  constructor(
    private user: UserService,
    private core:  CoreService,
    private http:  HttpClient,
    private cookieService: CookieService,
    private api: FormApiService
  ) { }
  ngOnInit () {
    const self = this;
    this.count = 0;
    this.userId = this.cookieService.get('userid');
    self.user.getMe().then((val: any) => {
      if (val) {
        self.userId = val._id;
        self.userPhoto = val.photo;
        self.userName = val.firstName;
        self.offerCount = parseInt(val.offer.length);
        self.isShow = !self.isShow;
        self.isLoaded = true;
        this.mobile = val.mobile;
        this.email = val.email;
        this.me = val;
      }
    });
    self.api.onProfile.subscribe(v => {
      if (v){
        this.mobile = v.mobile;
        this.email = v.email;
        this.me = v;
      }

    });

    self.core.doGet('estsOfBasket').then(v => {
      console.log(v);
      this.baskets = v;
    });
    this.core.doGet('basketsList?count={"$and":[{"$or":[{"status":{"$nin":["6","7"]}}]},{"owneruser":"'+this.userId+'"}]}').then((count:any)=>{
      // this.api.justGet('basketsList?count={"ownerest":"'+v._id+'"}').then((count:any)=>{
      this.countBaskets = parseInt(count.count);
    });
  }



  ngOnDestroy () {
    this.count = 0;
  }

  setcount(s) {
    this.maxcount = s.count;
    this.check();
  }

  check() {
    if (this.maxcount - this.limit <= this.limit * this.count) {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  }

  click() {
    const self = this;
    self.core.click();
  }

  goSearch(e){
    let s = this;
    if(e){
      this.http.get(this.domain + '/api/search?search="'+e+'"', this.api.getHeaders())
        .subscribe((res: any) => {
          s.friends = res.users;
          s.arrEts = res.est;
        });
    }
  }
  public popPreProd = false;
}
