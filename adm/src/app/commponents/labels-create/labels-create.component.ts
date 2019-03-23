import {Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {ApiService} from "../../service/api.service";
import {Label} from "./label";
import {Filter} from "../filters-create/filter";

@Component({
  selector: 'app-labels-create',
  templateUrl: './labels-create.component.html',
  styleUrls: ['./labels-create.component.css']
})
export class LabelsCreateComponent implements OnInit, OnDestroy {
  public box = new Label();
  public isClose = false;
  public isCheckCat = false;
  @Output() onCreate: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemove: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
  }
  ngOnDestroy(){
    this.onClose.next();
  }

  save(e){
    // alert(f)
    const s = this;
    console.log("ok",s.box);
    s.api.apiPost('label', s.box).then((val:any)=>{
      s.onCreate.next(val);
      s.box = new Label();
      // this.onClose.next('');
      s.isClose = true;
    }).catch(e=>{});
  }

  remove(el){
    this.box = new Label();
    this.onRemove.next(el);
  }
  cancel(){
    this.box = new Label();
    this.onClose.next();
  }
}
