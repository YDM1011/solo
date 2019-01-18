import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  @Input() chBox:any = '';
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    console.log(this.chBox)
  }

  ngOnChanges(){}

  save(){
    const s = this;
    s.api.apiPost('maincategory', s.chBox, s.chBox._id).then((val:any)=>{
      s.chBox = '';
      // s.onCreate.next(val);
      // s.box = new checkBoxC();
    })
  }
}
