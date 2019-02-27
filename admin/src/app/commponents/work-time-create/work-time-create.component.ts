import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Calendar} from "../../pages/work-time/work-time";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-work-time-create',
  templateUrl: './work-time-create.component.html',
  styleUrls: ['./work-time-create.component.css']
})
export class WorkTimeCreateComponent implements OnInit {
  public id: string;
  public calendar = new Calendar();
  @Output() onClose = new EventEmitter();
  public keyArr = [
    "timeRange1",
    "timeRange2",
    "timeRange3",
    "timeRange4",
    "timeRange5",
    "timeRange6",
    "timeRange7",
  ];
  public timeArray = [];

  @Output() onCreate = new EventEmitter();
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
    this.createDateT()
  }

  ngOnChanges() {
    let s = this;
    this.id = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe((params: any) => {
      s.id = params.id;
      s.initApi(params.id);
    });
  }
  createDateT() {
    this.keyArr.forEach( item => {
      let arrTimeS = this.calendar[item].timeStart.split(':');
      let arrTimeE = this.calendar[item].timeEnd.split(':');
      this.timeArray.push({
          timeStart: new Date(2019, 0, 1, arrTimeS[0], arrTimeS[1]),
          timeEnd: new Date(2019, 0, 1, arrTimeE[0], arrTimeE[1]),
          isValidS: true,
          isValidE: true
        });
    });
  }

  dateToString(pull: any, push: object) {
    this.keyArr.forEach( (item, num) => {
      if (pull[num].isValidS) {
        let timeS = pull[num].timeStart.toTimeString();
        timeS = timeS.split(' ');
        timeS = timeS[0].split(':');
        push[item].timeStart = `${timeS[0]}:${timeS[1]}`;
      }
      if (pull[num].isValidE) {
        let timeE = pull[num].timeEnd.toTimeString();
        timeE = timeE.split(' ');
        timeE = timeE[0].split(':');
        push[item].timeEnd = `${timeE[0]}:${timeE[1]}`;
      }
    });
  }

  ngOnDestroy(){}

  initApi(id){}

  radioCheck(el,it){
    switch (el) {
      case "isAllTime": {
        it.isAllTime = true;
        it.isWeekend = false;
        it.isTimeRange = false;
        return
      }
      case "isWeekend": {
        it.isWeekend = true;
        it.isAllTime = false;
        it.isTimeRange = false;
        return
      }
      case "isTimeRange": {
        it.isTimeRange = true;
        it.isAllTime = false;
        it.isWeekend = false;
        return
      }
    }
    console.log(el,it);
  }

  save(){
    let s = this;
    s.calendar.ownerEst = s.id;
    s.dateToString(s.timeArray, s.calendar);
    console.log(s.calendar);
    s.api.doPost('timeWork', s.calendar).then((val:any)=>{
      if(val){
        s.onCreate.emit(val)
      }
    })
  }
}
