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
  public keyArr = [
    "timeRange1",
    "timeRange2",
    "timeRange3",
    "timeRange4",
    "timeRange5",
    "timeRange6",
    "timeRange7",
  ];
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
    console.log(s.calendar);
    s.api.doPost('timeWork', s.calendar).then((val:any)=>{
      if(val){
        s.onCreate.emit(val)
      }
    })
  }
}
