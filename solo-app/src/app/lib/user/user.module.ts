import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AvatarComponent} from './avatar/avatar.component';
import {UploadModule} from "../upload/upload.module";
import {FormApiModule} from "../form-api/form-api.module";
import {MzBadgeModule} from "ngx-materialize";
import { UserLinkComponent } from './user-link/user-link.component';

@NgModule({
  imports: [
    FormApiModule,
    UploadModule,
    CommonModule,
    MzBadgeModule
  ],
  exports: [UserLinkComponent, AvatarComponent],
  declarations: [UserLinkComponent, AvatarComponent]

})
export class UserModule { }
