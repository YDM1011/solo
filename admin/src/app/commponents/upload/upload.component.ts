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
        fileName: self.avatar[i].name,
        base64default: self.avatar[i].def,
        base64crop: self.avatar[i].crop,
        model: self.model,
        field: self.field,
        id: self.id,
      };
      console.log(formObj);
      self.core.doPost('uploadImage', formObj).then((res: any) => {
        self.index = i+1;
        if(self.avatar[self.index]){
          self.nextLoad(self.index);
        }else{
          this.getImg.emit(res);
          return
        }
      }).catch(
        error => {
          console.log(error);
        });
    }
  }

}
