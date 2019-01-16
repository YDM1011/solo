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
    this.getImg.emit(this.avatar);
  }
  res(er){
    console.log(er);
    let obj = Object.assign({},er);
    this.avatar.push(obj);
    console.log(this.avatar);
  }

  uploadFile(){
    const self = this;

    this.fileInputElement = TemplateRef;
    //noinspection TypeScriptUnresolvedVariable,TypeScriptValidateTypes
    const inputEl = document.querySelectorAll('.profile-avatar');
    const elem = <any>inputEl[0];
    self.nextLoad(0)
  }

  nextLoad(i){

    let self = this;
    console.log(self.avatar[i]);
    let fileCount: number = self.avatar[i].size;
    if (fileCount && self.avatar[i].name) {
    let formObj = Object.assign({},{
      file: self.avatar[i].name,
      base64default: self.avatar[i].def,
      base64crop: self.avatar[i].crop,
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
        return
      }
    }).catch(
      error => {
        console.log(error);
      });
    }
  }
}
