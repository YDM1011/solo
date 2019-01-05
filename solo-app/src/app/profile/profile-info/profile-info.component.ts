import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {userData} from "../profile";
import {environment} from "../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth.service";
import {CoreService} from "../../core.service";
import {HttpClient} from "@angular/common/http";
import {FormApiService} from "../../lib/form-api/form-api.service";

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit, OnChanges {

  public domain: string = environment.apiDomain;

  @Output() onShow = new EventEmitter<any>();

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
  ngOnChanges(){}

  updateUserData(){
    let s = this;
    this.http.post(`${this.domain}/api/user/${s.me._id}`, s.me, this.api.getHeaders())
      .subscribe((user: any) => {
        s.me = user;
      });
  }

}
