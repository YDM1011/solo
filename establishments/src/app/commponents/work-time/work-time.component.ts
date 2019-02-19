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
    let HNow = moment().hours();
    if(s.workTime.worksTime){
      let Hs = parseInt(s.workTime.worksTime.timeStart.split(":")[0]);
      let He = parseInt(s.workTime.worksTime.timeEnd.split(":")[0]);

      if(s.workTime.worksTime.isWeekend) return s.weekend = true;
      if(s.workTime.worksTime.isAllTime) return s.allTime = true;

      if(HNow+1>=He && HNow < He && HNow > Hs){ s.closeInH = true}
      if(HNow>He || HNow < Hs){ s.closed = true}
      if(HNow>Hs && HNow+1 < He){ s.open = true}
    }

  }

}
