import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-like-dish-page',
  templateUrl: './like-dish-page.component.html',
  styleUrls: ['./like-dish-page.component.css']
})
export class LikeDishPageComponent implements OnInit {

  public photos;
  public id;
  constructor(
    private cookie : CookieService
  ) { }

  ngOnInit() {
    this.id = this.cookie.get('userid');
  }

}
