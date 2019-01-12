import {Component, Input, OnInit} from '@angular/core';
import {userData} from "./profile";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {CoreService} from "../core.service";
import {HttpClient} from "@angular/common/http";
import {FormApiService} from "../lib/form-api/form-api.service";
import {environment} from "../../environments/environment";
import * as moment from 'moment';
import {Status} from "./profileStatus";
import {profileLinks} from "./links";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  public domain: string = environment.apiDomain;

  public userId = location.href.split("user/")[1].split("/")[0];
  public me = new userData();
  public status = new Status();
  public statuse:any;
  public statusCheck:any;
  public isReady = false;
  public isStsWith = false;
  public isSelectActive = false;
  public maxDate;
  public data;
  public link = {};
  public links = new profileLinks();

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private core: CoreService,
    private http:  HttpClient,
    private router: Router,
    private api: FormApiService
  ) { }

  ngOnInit() {
    this.statuse = this.status.getStatuse();
  }

  stsCheck(key){
    this.isSelectActive = false;
    console.log(key);
    this.statusCheck = this.status.getChecked(key ? key : 'none');
    if(this.statusCheck.person){this.isStsWith = true}else{this.isStsWith = false}
  }

  linkCheck(){

  }

  updateUserData(){
    let s = this;
    s.me.bornedData = s.dataToString(s.data);
    s.me.familyStatus = Object.assign({}, s.statusCheck);
    this.http.post(`${this.domain}/api/user/${s.me._id}`, s.me, this.api.getHeaders())
      .subscribe((user: any) => {
        alert("success")
      });
  }

  onData(e){
    console.log(e);
    let s = this;
    s.me = (e);
    s.data = s.dataToObject(s.me.bornedData);
    s.maxDate = s.dataToObject(moment().toISOString());
    s.statusCheck = Object.assign({}, s.me.familyStatus);
    if(this.statusCheck.person){this.isStsWith = true}else{this.isStsWith = false}
    s.isReady = true;
  }

  dataToObject(data){
    console.log(data);
    let dp, dt, dz;
    dp = data.split("T")[0];
    dt = data.split("T")[1];
    return {
      year: parseInt(dp.split("-")[0]),
      month: parseInt(dp.split("-")[1]),
      day: parseInt(dp.split("-")[2])
    }
  }
  dataToString(obj){
    return ( moment(
      `${obj.year}-${obj.month}-${obj.day} 00:00:00`,
      'YYYY-MM-DD HH:mm:ss', 'UTC').format())
  }

  onDateSelect(e){
    let s = this;
    console.log(e);
    s.dataToString(s.data);
  }
}
