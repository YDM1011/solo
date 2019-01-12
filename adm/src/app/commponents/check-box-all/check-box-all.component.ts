import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-check-box-all',
  templateUrl: './check-box-all.component.html',
  styleUrls: ['./check-box-all.component.css']
})
export class CheckBoxAllComponent implements OnInit, OnChanges {

  public boxes = [];

  @Input() update;
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    console.log(this.boxes.length > 0);
    this.initApi();
  }

  ngOnChanges(){
    let s = this;
    s.boxes.push(s.update);
  }

  initApi(){
    const s = this;
    s.api.apiGet('checkBox').then((val:any)=>{
      s.boxes = val;
    })
  }

  edit(elem){
    this.onEdit.next(elem);
  }

  del(elem){
    const s = this;
    s.api.apiDel('checkBox', elem._id).then((val:any)=>{
      s.initApi()
    })
  }

}
