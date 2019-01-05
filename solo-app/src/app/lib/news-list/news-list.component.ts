import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from '../user/user.service';
import {CoreService} from '../../core.service';
import {CookieService} from 'ngx-cookie-service';
import {FormApiService} from '../form-api/form-api.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit, OnDestroy {
  public friends = [];
  public userId: string;
  public userPhoto: any;
  public userName: string;
  public activSearch = false;
  public isShow = false;
  public domain: string = environment.apiDomain;
  public count = 0;
  public limit = 4;
  public posts = [];
  @Input() word;
  @Output() onClick = new EventEmitter<any>();
  @Output() onNew: EventEmitter<any> = new EventEmitter<any>();
  public menuList = [];
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
    // this.userPhoto['_id'] = '';
    self.user.getMe().then((val: any) => {
      if (val) {
        self.userId = val._id;
        self.userPhoto = val.photo;
        self.userName = val.firstName;
        self.isShow = !self.isShow;
      }
    });

    self.getPosts();

  }

  getPosts() {
    const self = this;
    this.http.get(this.domain + '/api/post?skip=0', this.api.getHeaders())
      .subscribe((post: any) => {
        this.http.get(this.domain + '/api/post/count', this.api.getHeaders())
          .subscribe((res: any) => {
            self.posts = (post);
            self.setcount(res);
          });
      });
  }

  morePosts() {
    const self = this;
    self.count++;
    this.http.get(this.domain + '/api/post?skip=' + self.count * self.limit, this.api.getHeaders())
      .subscribe((post: any) => {
        self.posts = self.posts.concat(post);
        self.check();
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

  morePost() {
    const self = this;
    self.morePosts();
  }
}
