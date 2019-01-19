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

  save(){
    let s = this;
    console.log(s.obj);
    s.api.doPost(`timeWork/${s.obj._id}`, s.obj).then((val:any)=>{
      if(val){
        s.onEdit.emit(val);
      }
    })
  }
}
