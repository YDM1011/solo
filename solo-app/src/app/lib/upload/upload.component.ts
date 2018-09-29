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

  constructor(
    private core: UploadService,
    private el: ElementRef
  ) { }

  ngOnInit() {
  }
  uploadFile(){
    const self = this;
    this.fileInputElement = TemplateRef;

    //noinspection TypeScriptUnresolvedVariable,TypeScriptValidateTypes
    const inputEl = document.querySelectorAll('.profile-avatar');
    //noinspection TypeScriptUnresolvedFunction
    for (let i=0; i<inputEl.length; i++ ) {
      const elem =  <any>inputEl[i];
        const fileCount: number = elem.files.length;
        if (fileCount && elem.files.item(0)) {
          for (let i=0; i<elem.files.length; i++){
            console.log(elem.files[i]);
            const formData = new FormData();
            formData.append('file', elem.files.item(i));
            self.core.uploadAvatar(formData).then((res: any) => {
              this.avatar = 'data:image/png;base64,' + res.image;
              this.getImg.emit(self.avatar);
            }).catch(
              error => {
                console.log(error);
              });
          }

          elem.value = '';
          return
        }
    }
  }
  res(er){
    console.log(er);
  }
}
