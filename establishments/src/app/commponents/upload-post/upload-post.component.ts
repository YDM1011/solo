import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-upload-post',
  templateUrl: './upload-post.component.html',
  styleUrls: ['./upload-post.component.css']
})
export class UploadPostComponent implements OnInit {
  public avatar=[];
  @Output() getImg = new EventEmitter<any>();
  @Output() editImg = new EventEmitter<any>();
  @Input()  btnName: any = "Upload image";
  @Input()  model = null;
  @Input()  field = null;
  @Input()  push: any;
  id = null;

  constructor() { }

  ngOnInit() {
  }
  ngOnDestroy(){
    const s = this;
    s.model=null;
    s.field=null;
  }

  res(er){
    let obj = Object.assign({},{
      base64crop: er.def,
      fileName: er.name,
      model: this.model,
      field: this.field,
      id: this.id,
    });
    this.getImg.emit(obj);
  }
  editRes(er) {
    let obj = Object.assign({},{
      base64crop: er.def,
      fileName: er.name,
      model: this.model,
      field: this.field,
      id: this.id,
      index: er.index
    });
    this.editImg.emit(obj);
  }
}
