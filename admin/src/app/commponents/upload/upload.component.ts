import {Component, OnInit, Output, EventEmitter, Input, ElementRef, TemplateRef} from '@angular/core';
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
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

      let formObj = {
        file: elem.files.item(i).name,
        base64default: self.avatar[i].def,
        base64crop: self.avatar[i].crop,
        model: self.model,
        field: self.field,
        id: self.id,
      };
      console.log(formObj);
      self.core.doPost('uploadImage', formObj).then((res: any) => {
        this.avatar[self.index].def = res.url;
        if(elem.files.item(self.index)){
          self.nextLoad(elem, self.index);
          self.index++;
        }else{
          self.index = 0;
          return elem.value = '';
        }
      }).catch(

        error => {
          console.log(error);
        });
    }
  }

}
