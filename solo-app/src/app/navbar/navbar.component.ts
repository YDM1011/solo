import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private searchTerms = new Subject<string>();

  public menuList = [];
  private httpOptions: { headers: HttpHeaders, withCredentials: boolean };
  // 'Authorization': 'my-auth-token'
  getHeaders(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        }),
      withCredentials: true
    };
    return this.httpOptions;
  }
  constructor(
      private http:  HttpClient
  ) { }

  search(term: string): void {
    this.searchTerms.next(term);
    console.log('true')
  }

  ngOnInit() {
    this.http.get('http://localhost:3000/api/menu', this.getHeaders())
        .subscribe((menu: any) => this.menuList = menu);
  }

}
