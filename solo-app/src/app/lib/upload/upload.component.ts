import {
  Component,
  OnInit,
  TemplateRef,
  ElementRef,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy
} from '@angular/core';
import {UploadService} from "./upload.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, OnChanges, OnDestroy {

  public avatar=[];
  private fileInputElement: any;
  @Output() getImg = new EventEmitter<any>();
  @Input()  btnName: any = "Upload image";
  @Input()  multiple: boolean = false;
  @Input()  model = null;
  @Input()  field = null;
  @Input()  id = null;

  constructor(
    private core: UploadService,
    private el: ElementRef
  ) { }

  ngOnInit() {
  }
  ngOnChanges(){
  }
  ngOnDestroy(){
    const s = this;
    s.model=null;
    s.field=null;
    s.id=null;
  }
  savePics() {
    console.log(this.avatar);
    this.uploadFile();

  }
  res(er){
    console.log(er);
    let obj = Object.assign({},er);
    this.avatar.push(obj);
    this.savePics();
    this.avatar = [];
  }

  uploadFile(){
    const self = this;
    self.nextLoad(0)
  }

  nextLoad(i){
    let self = this;
    console.log(self.avatar[i]);
    let fileCount: number = self.avatar[i].size;
    if (fileCount && self.avatar[i].name) {
    let formObj = Object.assign({},{
      // base64default: self.avatar[i].def,
      base64crop: self.avatar[i].crop,
      fileName: self.avatar[i].name,
      model: self.model,
      field: self.field,
      id: self.id,
    });
    self.core.uploadAvatar(formObj, i).then((res: any) => {
      let index = res.i+1;
      this.avatar[res.i].def = res.res.url;
      if(self.avatar[index]){
        self.nextLoad(index)
      }else{
        this.getImg.emit(this.avatar);
        self.avatar = [];
        return
      }
    }).catch(
      error => {
        console.log(error);
      });
    }
  }
}
