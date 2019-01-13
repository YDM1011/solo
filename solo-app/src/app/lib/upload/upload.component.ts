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
  public btn = '<span class="btn waves-effect  deep-purple darken-4">Додати фото</span>';

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

    this.avatar.push({def:er.imgMax});
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
    // console.log(elem.files.item(i));
    self.core.uploadAvatar(formData, i).then((res: any) => {
      let index = res.i+1;
      this.avatar[res.i].def = res.res.url;
      if(elem.files.item(index)){
        self.nextLoad(elem, index)
      }else{
        return elem.value = '';
      }
      // this.getImg.emit({larg:self.avatar});
    }).catch(

      error => {
        console.log(error);
      });
    }
  }
}
