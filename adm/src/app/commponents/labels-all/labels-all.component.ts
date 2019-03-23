import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-labels-all',
  templateUrl: './labels-all.component.html',
  styleUrls: ['./labels-all.component.css']
})
export class LabelsAllComponent implements OnInit, OnChanges {

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
    console.log(s.update, s.boxes);
    s.boxes.push(s.update);
  }

  initApi(){
    const s = this;
    s.api.apiGet('label').then((val:any)=>{
      s.boxes = val;
    })
  }

  edit(elem){
    this.onEdit.next(elem);
  }
  del(elem){
    const s = this;
    s.api.apiDel('label', elem._id).then((val:any)=>{
      s.initApi()
    })
  }
}
