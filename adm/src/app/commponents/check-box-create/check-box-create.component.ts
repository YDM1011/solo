import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {checkBoxC} from "./check-box";
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-check-box-create',
  templateUrl: './check-box-create.component.html',
  styleUrls: ['./check-box-create.component.css']
})
export class CheckBoxCreateComponent implements OnInit {

  public box = new checkBoxC();

  @Output() onCreate: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
  }

  save(){
    const s = this;
    s.api.apiPost('checkBox', s.box).then((val:any)=>{
      s.onCreate.next(val);
      s.box = new checkBoxC();
    })
  }

  cancel(){
    this.box = new checkBoxC();
  }
}
