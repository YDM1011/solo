import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {checkBoxC} from "../check-box-create/check-box";
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-check-box-edit',
  templateUrl: './check-box-edit.component.html',
  styleUrls: ['./check-box-edit.component.css']
})
export class CheckBoxEditComponent implements OnInit, OnChanges {

  @Input() chBox:any = '';
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    console.log(this.chBox)
  }

  ngOnChanges(){

  }

  save(){
    const s = this;
    s.api.apiPost('checkBox', s.chBox, s.chBox._id).then((val:any)=>{
      s.chBox = '';
      // s.onCreate.next(val);
      // s.box = new checkBoxC();
    })
  }
}
