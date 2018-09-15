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
  public post = {
    title: '',
    des: ''
  };
  constructor(
    private http:  HttpClient,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
  }

  take(i){
    this.active = i;
    this.t = false
  }
  newText($event){
    console.log($event);
  }
  private httpOptions: { headers: HttpHeaders, withCredentials: boolean };
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
  addPost(){
    this.http.post('http://localhost:3000/api/post', this.post, this.getHeaders())
      .subscribe((post: any) => console.log(post));
  }
}
