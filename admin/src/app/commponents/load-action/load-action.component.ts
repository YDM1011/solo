import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-load-action',
  templateUrl: './load-action.component.html',
  styleUrls: ['./load-action.component.css']
})
export class LoadActionComponent implements OnInit {

  public avatar=[];
  private fileInputElement: any;
  @Output() getImg = new EventEmitter<any>();
  @Input()  btnName: any = "Upload image";
  @Input()  multiple: boolean = false;
  @Input()  model;
  @Input()  field;
  @Input()  id;

  private index: number = 0;

  constructor(
    private core: ApiService,
    private el: ElementRef
  ) { }

  ngOnInit() {
  }
  savePics(){
    console.log();
    this.uploadFile();
  }
  res(er){
    console.log(er);
    this.avatar.push({
      def:er.def,
      crop:er.crop,
      name: er.name,
      size: er.size,
    });
    console.log(this.avatar);
  }


  uploadFile(){
    const self = this;
    self.nextLoad(0)
  }

  nextLoad(i){
    let self = this;

    let fileCount: number = self.avatar[i].size;
    if (fileCount && self.avatar[i].name) {
      let formObj = {
        base64default: self.avatar[i].def,
        base64crop: self.avatar[i].crop,
      };
      self.getImg.emit(formObj);
    }
  }

}
