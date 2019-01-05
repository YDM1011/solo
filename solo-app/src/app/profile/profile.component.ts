import {Component, Input, OnInit} from '@angular/core';
import {userData} from "./profile";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {CoreService} from "../core.service";
import {HttpClient} from "@angular/common/http";
import {FormApiService} from "../lib/form-api/form-api.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public domain: string = environment.apiDomain;

  public userId = location.href.split("user/")[1].split("/")[0];
  public me = new userData();

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private core: CoreService,
    private http:  HttpClient,
    private router: Router,
    private api: FormApiService
  ) { }

  ngOnInit() {
  }

  updateUserData(){
    let s = this;
    this.http.post(`${this.domain}/api/user/${s.me._id}`, s.me, this.api.getHeaders())
      .subscribe((user: any) => {
        alert("success")
      });
  }
}
