import {Component, OnInit, ElementRef, TemplateRef, Input} from '@angular/core';
import {UploadService} from "../../upload/upload.service";
import {User} from "../user";
import {AuthService} from "../../../auth.service";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  @Input() id: string;
  @Input() user: User;
  private fileInputElement: any;
  public btn = '<span class="btn waves-effect  deep-purple darken-4">Додати bg</span>';
  constructor(
    private core: AuthService,
    private upload: UploadService,
    private el: ElementRef
  ) { }

  ngOnInit() { }

  getSetting(res){
    let self = this;
    if(res){
      console.log(res);
      self.user = res;
      self.core.setUserData(res);
    }
  };

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
  uploadBG(){
    const self = this;
    this.fileInputElement = TemplateRef;
    //noinspection TypeScriptUnresolvedVariable
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#profile-user-bg');
    const fileCount: number = inputEl.files.length;
    if (fileCount && inputEl.files.item(0)) {
      const formData = new FormData();
      formData.append('file', inputEl.files.item(0));
      self.upload.uploadAvatar(formData).then((res:any) => {
        self.user.bg = 'data:image/png;base64,'+res.image;
      }).catch(
        error => {
          console.log(error);
        });
    }
  }
}

