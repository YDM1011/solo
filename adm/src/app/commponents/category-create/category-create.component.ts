import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiService} from "../../service/api.service";
import {CategoryC} from "./category";

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  public box = new CategoryC();

  @Output() onCreate: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
  }

  save(){
    const s = this;
    s.api.apiPost('maincategory', s.box).then((val:any)=>{
      s.onCreate.next(val);
      s.box = new CategoryC();
    })
  }

  cancel(){
    this.box = new CategoryC();
  }
}
