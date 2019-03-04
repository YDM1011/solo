import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-filters-edit',
  templateUrl: './filters-edit.component.html',
  styleUrls: ['./filters-edit.component.css']
})
export class FiltersEditComponent implements OnInit {

  @Input() chBox:any = '';
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    console.log(this.chBox)
  }

  ngOnChanges(){console.log(this.chBox)}

  save(){
    const s = this;
    s.api.apiPost('geoFilter', s.chBox, s.chBox._id).then((val:any)=>{
      s.cancel()
      // s.onCreate.next(val);
      // s.box = new checkBoxC();
    })
  }
  setCat(e){
    let s = this;
    s.chBox.valueName = e.name;
    s.chBox.value = e._id;
  }
  cancel(){
    this.chBox = '';
    this.onEdit.next('')
  }
}
