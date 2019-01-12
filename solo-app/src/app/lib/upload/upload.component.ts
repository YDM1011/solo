import {Component, OnInit, TemplateRef, ElementRef, Output, EventEmitter, Input} from '@angular/core';
import {UploadService} from "./upload.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  inputs: ['key'],
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public avatar = '';
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
  savePics(pics){
    console.log(pics);
    this.uploadFile();
    this.getImg.emit(pics);
  }
  res(er){
    console.log(er);
    this.avatar = er.imgMax;
  }

  uploadFile(){
    const self = this;
    this.fileInputElement = TemplateRef;

    //noinspection TypeScriptUnresolvedVariable,TypeScriptValidateTypes
    const inputEl = document.querySelectorAll('.profile-avatar');
    for (let i=0; i<inputEl.length; i++ ) {
      const elem = <any>inputEl[i];
      const fileCount: number = elem.files.length;
      if (fileCount && elem.files.item(0)) {
        for (let i=0; i<elem.files.length; i++){
          console.log(elem.files[i]);
          const formData = new FormData();
          formData.append('file', elem.files.item(i));
          formData.append('text', self.avatar);
          // console.log(elem.files.item(i));
          self.core.uploadAvatar(formData).then((res: any) => {
            this.avatar = res.image;
            console.log(self.avatar);
            // this.getImg.emit({larg:self.avatar});
          }).catch(
            error => {
              console.log(error);
            });
        }
      }

      elem.value = '';
      return
    }
  }
}
