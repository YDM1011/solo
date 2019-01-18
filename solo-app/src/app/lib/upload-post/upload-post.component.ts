import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UploadService} from "./upload.service";

@Component({
  selector: 'app-upload-post',
  templateUrl: './upload-post.component.html',
  styleUrls: ['./upload-post.component.css']
})
export class UploadPostComponent implements OnInit {
  public avatar=[];
  @Output() getImg = new EventEmitter<any>();
  @Input()  btnName: any = "Upload image";
  @Input()  model = null;
  @Input()  field = null;
  id = null;

  constructor(
    private core: UploadService,
  ) { }

  ngOnInit() {
  }
  ngOnDestroy(){
    const s = this;
    s.model=null;
    s.field=null;
  }

  res(er){
    console.log(er);
    let obj = Object.assign({},er);
    this.avatar.push(obj);
    console.log(this.avatar);
  }
  savePics() {
    console.log(this.avatar);
    this.uploadFile();
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
        base64default: self.avatar[i].def,
        base64crop: self.avatar[i].def,
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
