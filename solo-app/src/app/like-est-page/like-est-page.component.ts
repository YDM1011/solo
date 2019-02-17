import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {CoreService} from "../core.service";
import {HttpClient} from "@angular/common/http";
import {FormApiService} from "../lib/form-api/form-api.service";

@Component({
  selector: 'app-like-est-page',
  templateUrl: './like-est-page.component.html',
  styleUrls: ['./like-est-page.component.css']
})
export class LikeEstPageComponent implements OnInit {

  public domain: string = environment.apiDomain;
  public host: string = environment.apiDomain.split('//')[1];

  public ests:any = [];
  public id:any;
  public obj:any;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private core: CoreService,
    private http:  HttpClient,
    private router: Router,
    private api: FormApiService
  ) { }
  ngOnChanges() {}
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
    const s = this;
    this.http.get(this.domain + '/api/getLikeEsts/all/' + idc, s.api.getHeaders())
      .subscribe((ests: any) => {
        s.ests = ests
      });
  }
}