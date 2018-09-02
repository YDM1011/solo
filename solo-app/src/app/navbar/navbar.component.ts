import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public menuList = [];

  constructor(
      private http:  HttpClient
  ) { }
  ngOnInit() {
    this.http.get('http://localhost:3000/getmenu')
        .subscribe((menu: any) => this.menuList = menu);
  }

  check(text, link){
    this.http.get(`http://localhost:3000/getmenu/${text}/${link}`)
        .subscribe((menu: any) => this.menuList = menu);
  }
}
