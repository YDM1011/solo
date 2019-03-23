import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiService} from "../../service/api.service";
import {Filter} from "./filter";

@Component({
  selector: 'app-filters-create',
  templateUrl: './filters-create.component.html',
  styleUrls: ['./filters-create.component.css']
})
export class FiltersCreateComponent implements OnInit {
  public box = new Filter();
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

  save(){
    const s = this;
    s.api.apiPost('geoFilter', s.box).then((val:any)=>{
      s.onCreate.next(val);
      s.box = new Filter();
      s.isClose = true;
    }).catch(e=>{})
  }

  remove(el){
    this.box = new Filter();
    this.onRemove.next(el);
  }
  cancel(){
    this.box = new Filter();
    this.onClose.next();
  }


  setCat(e){
    let s = this;
    s.box.valueName = e.name;
    s.box.value = e._id;
  }
}
