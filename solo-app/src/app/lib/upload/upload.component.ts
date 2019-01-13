import {Component, OnInit, TemplateRef, ElementRef, Output, EventEmitter, Input} from '@angular/core';
import {UploadService} from "./upload.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  inputs: ['key'],
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public avatar=[];
  private fileInputElement: any;
  @Output() getImg = new EventEmitter<any>();
  @Input()  btnName: any = "Upload image";
  @Input()  multiple: boolean = false;
  @Input()  model;
  @Input()  field;
  @Input()  id;

  constructor(
    private core: UploadService,
    private el: ElementRef
  ) { }

  ngOnInit() {
  }
  savePics(){
    console.log();
    this.uploadFile();
    this.getImg.emit(this.avatar);
  }
  res(er){
    console.log(er);
    this.avatar.push({def:er.def, crop:er.crop});
    console.log(this.avatar);
  }


  uploadFile(){
    const self = this;
    this.fileInputElement = TemplateRef;
    //noinspection TypeScriptUnresolvedVariable,TypeScriptValidateTypes
    const inputEl = document.querySelectorAll('.profile-avatar');
    const elem = <any>inputEl[0];
    self.nextLoad(elem, 0)
  }

  nextLoad(elem, i){
    console.log(elem, i);
    let self = this;

    let fileCount: number = elem.files.length;
    if (fileCount && elem.files.item(0)) {

    let formData = new FormData();
    formData.append('file', elem.files.item(i));
    formData.append('base64default', self.avatar[i].def);
    formData.append('base64crop', self.avatar[i].crop);
    formData.append('model', self.model);
    formData.append('field', self.field);
    formData.append('id', self.id);
    let formObj = {
      file: elem.files.item(i).name,
      base64default: self.avatar[i].def,
      base64crop: self.avatar[i].crop,
      model: self.model,
      field: self.field,
      id: self.id,
    };
    console.log(formObj);
    self.core.uploadAvatar(formObj, i).then((res: any) => {
      let index = res.i+1;
      this.avatar[res.i].def = res.res.url;
      if(elem.files.item(index)){
        self.nextLoad(elem, index)
      }else{
        return elem.value = '';
      }
    }).catch(

      error => {
        console.log(error);
      });
    }
  }
}
