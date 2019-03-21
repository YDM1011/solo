import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiService} from "../../service/api.service";
import {Label} from "./label";

@Component({
  selector: 'app-labels-create',
  templateUrl: './labels-create.component.html',
  styleUrls: ['./labels-create.component.css']
})
export class LabelsCreateComponent implements OnInit {
  public box = new Label();
  public isClose = false;
  public isCheckCat = false;
  @Output() onCreate: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
  }

  save(){
    const s = this;
    s.api.apiPost('label', s.box).then((val:any)=>{
      s.onCreate.next(val);
      s.box = new Label();
      s.isClose=true;
    }).catch(e=>{})
  }

  cancel(){
    this.box = new Label();
    this.onCreate.next('');
  }
}
