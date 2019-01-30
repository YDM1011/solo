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
  public dateOfBirth;

  public options: Pickadate.DateOptions = {
    clear: 'Очистити',
    close: 'Обрати',
    today: 'Сьогодні',
    closeOnClear: true,
    closeOnSelect: false,
    format: 'dd.mm.yyyy',
    formatSubmit: 'yyyy-mm-dd',
    hiddenName: true,
    onSet: (context) => {
      if ( context.select != null) this.data = this.dataToObject2( new Date(context.select));
      console.log(this.data)
    },
    selectMonths: true,
    selectYears: 10,
    firstDay: true,
    min: new Date(1950,1,1),
    max: new Date(),
    monthsFull: [
      'Січень',
      'Лютий',
      'Березень',
      'Квітень',
      'Травень',
      'Червень',
      'Липень',
      'Серпень',
      'Вересень',
      'Жовтень',
      'Листопад',
      'Грудень'
    ],
    monthsShort: [
      'Січня',
      'Лютого',
      'Березя',
      'Квітеня',
      'Травеня',
      'Червеня',
      'Липеня',
      'Серпеня',
      'Вересеня',
      'Жовтня',
      'Листопада',
      'Груденя'
    ],
    weekdaysFull: [
      'Нд',
      'Пн',
      'Вт',
      'Ср',
      'Чт',
      'Пт',
      'Сб'
    ],
    weekdaysShort:[
      'Неділя',
      'Понеділок',
      'Вівторок',
      'Середа',
      'Четвер',
      'П\'ятниця',
      'Субота'
    ],
    showMonthsShort: undefined,
    showWeekdaysFull: true,
  };

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
    console.log(s.me.bornedData);
    this.http.post(`${this.domain}/api/user/${s.me._id}`, s.me, this.api.getHeaders())
      .subscribe((user: any) => {
        console.log(s.me.bornedData);
        alert("success")
      });
  }

  onData(e){
    console.log(e);
    let s = this;
    s.me = (e);
    s.data = s.dataToObject(s.me.bornedData || new Date().toISOString());
    s.dateOfBirth = s.me.bornedData;
    console.log(s.dateOfBirth);
    s.maxDate = s.dataToObject(moment().toISOString());
    s.statusCheck = Object.assign({}, s.me.familyStatus);
    if(this.statusCheck.person){this.isStsWith = true}else{this.isStsWith = false}
    s.isReady = true;
  }

  dataToObject2(data){
    return {
      year: data.getFullYear(),
      month: data.getMonth()+1,
      day: data.getDate()
    }
  }

  dataToObject(data){
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
    console.log('e', e);
    console.log(s.dataToString(s.data));
  }
}
