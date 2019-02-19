import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {LikeEstPageComponent} from "../like-est-page/like-est-page.component";
import {AuthService} from "../auth.service";
import {CoreService} from "../core.service";
import {FormApiService} from "../lib/form-api/form-api.service";

@Component({
  selector: 'app-liked-est-list',
  templateUrl: './liked-est-list.component.html',
  styleUrls: ['./liked-est-list.component.css']
})
export class LikedEstListComponent implements OnInit {

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
        console.log(ests)
        s.ests = ests
      });
  }
}
