import {Component, OnInit, Input, EventEmitter, Output, AfterViewInit, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from '../auth.service';
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
        animate('300ms ease-out')
      ]),
      transition('open => closed', [
        animate('200ms ease-out')
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
  public limit = 4;
  public offerCount;
  public posts = [];
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
    // this.userId = this.cookieService.get('userid');
    self.user.getMe().then((val: any) => {
      if (val) {
        self.userId = val._id;
        self.userPhoto = val.photo;
        self.userName = val.firstName;
        self.offerCount = val.offer.length;
        self.isShow = !self.isShow;
      }
    });

    self.getPosts();

  }

  getPosts() {
    const self = this;
    let query = JSON.stringify({});
    this.http.get(this.domain + '/api/post?skip=' + self.count * self.limit, this.api.getHeaders())
      .subscribe((post: any) => {
        this.http.get(this.domain + '/api/post/count', this.api.getHeaders())
          .subscribe((res: any) => {
            self.posts = (post);
            self.setcount(res);
          });
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
    console.log(e);
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
