import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment'

@Component({
  selector: 'app-work-time',
  templateUrl: './work-time.component.html',
  styleUrls: ['./work-time.component.css']
})
export class WorkTimeComponent implements OnInit {

  public workTime;
  public open:boolean = false;
  public closed:boolean = false;
  public closeInH:boolean = false;
  public weekend:boolean = false;
  public allTime:boolean = false;
  constructor() { }

  ngOnInit() {
  }

  getWorckTime(e){
    let s = this;
    s.workTime = e;
    let HNow = moment().hours() * 60 + moment().minutes();
    if(s.workTime.worksTime){
      let Hs = parseInt(s.workTime.worksTime.timeStart.split(":")[0]);
      let Ms = parseInt(s.workTime.worksTime.timeStart.split(":")[1]);
      let He = parseInt(s.workTime.worksTime.timeEnd.split(":")[0]);
      let Me = parseInt(s.workTime.worksTime.timeEnd.split(":")[1]);
      let timS = Hs*60+Ms;
      let timE = He*60+Me;
      if(timE<timS){timE += 24*60}
      if(s.workTime.worksTime.isWeekend) return s.weekend = true;
      if(s.workTime.worksTime.isAllTime) return s.allTime = true;

      if(HNow+60>=timE && HNow < timE && HNow > timS){ s.closeInH = true}
      if(HNow>timE || HNow < timS){ s.closed = true}
      if(HNow>timS && HNow+60 < timE){ s.open = true}
    }

  }

}
