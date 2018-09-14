import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {HttpHeaders} from "@angular/common/http";
import {CoreService} from "../core.service";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public arr = [1,2,3,4,5,6,7];
  public active = '';
  public t: boolean;
  constructor(
  ) { }

  ngOnInit() { }

  take(i){
    this.active = i;
    this.t = false
  }
}
