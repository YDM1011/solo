import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-work-time-edit',
  templateUrl: './work-time-edit.component.html',
  styleUrls: ['./work-time-edit.component.css']
})
export class WorkTimeEditComponent implements OnInit {
  public id: string;
  @Input() obj:any;
  @Output() onEdit = new EventEmitter();
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.createDateT()
  }

  ngOnChanges(){

  }

  ngOnDestroy(){

  }

  initApi(){

  }

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
  }

  createDateT() {
    this.keyArr.forEach( item => {
      let arrTimeS = this.obj[item].timeStart.split(':');
      let arrTimeE = this.obj[item].timeEnd.split(':');
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

  save(){
    let s = this;
    s.dateToString(s.timeArray, s.obj);
    console.log(s.obj);
    s.api.doPost(`timeWork/${s.obj._id}`, s.obj).then((val:any)=>{
      if(val){
        s.onEdit.emit(val);
      }
    })
  }
}
