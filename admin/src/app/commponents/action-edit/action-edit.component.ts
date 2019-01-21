import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-action-edit',
  templateUrl: './action-edit.component.html',
  styleUrls: ['./action-edit.component.css']
})
export class ActionEditComponent implements OnInit {
  public id: string;
  @Input() obj:any;
  @Output() onEdit = new EventEmitter();
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

  getPic(e){
    let s = this;
    s.obj['picC'] = e.base64crop;
    s.obj['picD'] = e.base64default;
  }

  save(){
    let s = this;
    console.log(s.obj);
    s.api.doPost(`action/${s.obj._id}`, s.obj).then((val:any)=>{
      if(val){
        s.onEdit.emit(val);
      }
    })
  }
}
