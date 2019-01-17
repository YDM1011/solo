import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {CoreService} from "../core.service";
import {HttpClient} from "@angular/common/http";
import {FormApiService} from "../lib/form-api/form-api.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-galery-page',
  templateUrl: './galery-page.component.html',
  styleUrls: ['./galery-page.component.css']
})
export class GaleryPageComponent implements OnInit {

  public domain: string = environment.apiDomain;

  public id:any;
  public obj:any;
  public fullPic:any;
  public photos:any = [];

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private core: CoreService,
    private http:  HttpClient,
    private router: Router,
    private api: FormApiService
  ) { }

  ngOnInit() {
    const s = this;
    s.id = location.href.split("user/")[1].split("/")[0];
    s.obj = JSON.stringify({id: s.id});

    s.route.params.subscribe((params: any) => {
      s.id = location.href.split("user/")[1].split("/")[0];
      s.obj = JSON.stringify({id: s.id});
      s.apiInitial(s.id);
    });
  }
  apiInitial(idc) {
    const self = this;
    this.http.get(this.domain + '/api/getPhoto?userId=' + idc, this.api.getHeaders())
      .subscribe((photo: any) => {
        self.photos = (photo);
      });
  }
  show(el){
    let s = this;
    s.fullPic = el;
  }
  hide(){
    let s = this;
    s.fullPic = ''
  }
}

