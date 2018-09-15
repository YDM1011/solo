import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import {MzBadgeModule} from "ngx-materialize";
// import { UserLinkComponent } from './user-link/user-link.component';
//
// @NgModule({
//   imports: [
//     CommonModule,
//     MzBadgeModule
//
//   ],
//   exports: [
//     UserLinkComponent
//   ],
//   declarations: [UserLinkComponent]

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
