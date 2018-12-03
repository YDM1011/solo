import {Component, OnInit, Input, EventEmitter, Output, AfterViewInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "../auth.service";
import {UserService} from "../lib/user/user.service";
import {CoreService} from "../core.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {
  public friends = [
    {name: 'Den'},
    {name: 'Misha'},
    {name: 'Andry'}
  ];
  public userId: string;
  public userPhoto:any;
  public userName: string;
  public activSearch: boolean = false;
  public isShow: boolean = false;
  @Input() word;
  @Output() onClick = new EventEmitter<any>();
  @Output() onNew: EventEmitter<any> = new EventEmitter<any>();
  public menuList = [];
  private httpOptions: {
    headers: HttpHeaders,
    withCredentials: boolean };

  // 'Authorization': 'my-auth-token'
  getHeaders(){
    let self = this;
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
    private cookieService: CookieService
  ) { }
  ngOnInit () {
    let self = this;
    // this.userPhoto['_id'] = '';
    self.user.getMe().then((val:any)=>{
      if(val){
        self.userId = val._id;
        self.userPhoto = val.photo;
        self.userName = val.firstName;
        self.isShow = !self.isShow;
      }
    });
  }
  click(){
    let self = this;
    self.core.click()
  }
}
