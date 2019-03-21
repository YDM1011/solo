import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-labels-edit',
  templateUrl: './labels-edit.component.html',
  styleUrls: ['./labels-edit.component.css']
})
export class LabelsEditComponent implements OnInit {

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
    s.api.apiPost('label', s.chBox, s.chBox._id).then((val:any)=>{
      s.cancel()
      // s.onCreate.next(val);
      // s.box = new checkBoxC();
    })
  }
  cancel(){
    this.chBox = '';
    this.onEdit.next('')
  }
}
