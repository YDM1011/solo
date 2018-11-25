import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public id:any;
  public user:any;
  public access: boolean = false;
  constructor(private cookie:CookieService) { }

  ngOnInit() {
    this.id = this.cookie.get('userid')
  }
  forbidden(mes){
    let s = this;
    s.access = false;
  }
  result(data){
    let s = this;
    s.user = (data);
    s.access = true;
  }
}
