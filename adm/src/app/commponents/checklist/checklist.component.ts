import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {

  public boxes = [];
  public getItems = [];

  @Input() apiLink;
  @Input() isMultiplay = false;
  @Output() onChecked: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    console.log(this.boxes.length > 0);
    this.initApi();
  }

  ngOnChanges(){
    let s = this;
  }

  initApi(){
    const s = this;
    s.api.apiGet(this.apiLink).then((val:any)=>{
      s.boxes = val;
    })
  }

  getObj(item){
    if (!this.isMultiplay){
      this.boxes = [];
      this.onChecked.emit(item)
    }
  }

  send(){
    this.boxes.map(it=>{
      if(it.check){
        delete it.check;
        this.getItems.push(it);
      }
    });
    this.onChecked.emit(this.getItems)
  }

  cancel(){
    this.boxes = [];
    this.onChecked.next('');
  }

}
