import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() word;
  @Output() onNew: EventEmitter<any> = new EventEmitter<any>();

  public menuList = [];
  private httpOptions: { headers: HttpHeaders, withCredentials: boolean };

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
      private http:  HttpClient,
      private cookieService: CookieService
  ) { }


  ngOnInit() {
    this.http.get('http://localhost:3000/api/menu', this.getHeaders())
        .subscribe((menu: any) => this.menuList = menu);
  }

}
