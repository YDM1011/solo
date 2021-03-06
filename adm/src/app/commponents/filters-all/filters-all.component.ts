import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-filters-all',
  templateUrl: './filters-all.component.html',
  styleUrls: ['./filters-all.component.css']
})
export class FiltersAllComponent implements OnInit {

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
    s.api.apiGet('geoFilter').then((val:any)=>{
      s.boxes = val;
    })
  }

  edit(elem){
    this.onEdit.next(elem);
  }

  del(elem){
    const s = this;
    s.api.apiDel('geoFilter', elem._id).then((val:any)=>{
      s.initApi()
    })
  }

}
