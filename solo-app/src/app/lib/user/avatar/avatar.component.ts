import {Component, OnInit, ElementRef, TemplateRef} from '@angular/core';
import {CoreService} from "../../../core.service";
import {UploadService} from "../../upload/upload.service";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  public user = {avatar: ''};
  private fileInputElement: any;
  constructor(
    private core: CoreService,
    private upload: UploadService,
    private el: ElementRef
  ) { }

  ngOnInit() {
    let self = this;

    this.core.getSetting().then((res:any)=>{
      if(res){
        console.log(res);
        self.user.avatar = res.avatar;
      }
    });
  }
  uploadFile(){
    const self = this;
    this.fileInputElement = TemplateRef;

    //noinspection TypeScriptUnresolvedVariable
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#profile-user-avatar');
    const fileCount: number = inputEl.files.length;
    if (fileCount && inputEl.files.item(0)) {
      const formData = new FormData();
      formData.append('file', inputEl.files.item(0));
      self.upload.uploadAvatar(formData).then((res:any) => {
        self.user.avatar = 'data:image/png;base64,'+res.image;
      }).catch(
        error => {
          console.log(error);
        });
    }
  }
}

