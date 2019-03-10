import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api.service";
import {Calendar} from "./work-time";

@Component({
  selector: 'app-work-time',
  templateUrl: './work-time.component.html',
  styleUrls: ['./work-time.component.css']
})
export class WorkTimeComponent implements OnInit, OnChanges, OnDestroy {

  public id: string;
  public calendar;
  public isShow:any = {};
  public isCreate;
  public calendars = [];
  public keyArr = [
    "timeRange1",
    "timeRange2",
    "timeRange3",
    "timeRange4",
    "timeRange5",
    "timeRange6",
    "timeRange7",
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {
    let s = this;
    this.id = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe((params: any) => {
      s.id = params.id;
      s.initApi(params.id);
    });
  }
  ngOnChanges() {
    let s = this;
    this.id = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe((params: any) => {
      s.id = params.id;
      s.initApi(params.id);
    });
  }

  ngOnDestroy(){}

  initApi(id){
    console.log(id);
    const s = this;
    s.calendar = new Calendar();
    s.api.justGet(`timeWork?query={"ownerEst":"${id}"}`).then((val:any)=>{
      if(val){
        s.calendars = val
      }
    })
  }

  del(id){
    let s = this;
    s.api.doDel('timeWork',id).then(val=>{
      s.api.justGet(`timeWork?query={"ownerEst":"${s.id}"}`).then((val:any)=>{
        if(val){
          s.calendars = val
        }
      })
    })
  }

  calendarsEdit(e,calendar){
    let s = this;
    calendar=e;
    s.isShow[calendar._id] = false;
  }

  calendarsAdd(e){
    let s = this;
    // console.log("ok!!!",s.calendars, e);
    // s.calendars.push(e);
  }
}
