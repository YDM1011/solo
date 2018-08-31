import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

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
