import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AvatarComponent} from './avatar/avatar.component';
import {UploadModule} from "../upload/upload.module";
import {FormApiModule} from "../form-api/form-api.module";

@NgModule({
  imports: [
    FormApiModule,
    UploadModule,
    CommonModule
  ],
  exports: [AvatarComponent],
  declarations: [AvatarComponent]
})
export class UserModule { }
