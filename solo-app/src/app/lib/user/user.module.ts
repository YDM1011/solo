import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AvatarComponent} from './avatar/avatar.component';
import {UploadModule} from "../upload/upload.module";
import {FormApiModule} from "../form-api/form-api.module";
import {UserService} from "./user.service";
import {IsMyProfileModule} from "../is-my-profile/is-my-profile.module";
import { BgComponent } from './bg/bg.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserInitComponent } from './user-init/user-init.component';
import { FirstNameComponent } from './first-name/first-name.component';
import { LastNameComponent } from './last-name/last-name.component';
import {FormsModule} from "@angular/forms";
import {ImgComponent} from "../img/img.component";

@NgModule({
  imports: [
    FormApiModule,
    UploadModule,
    CommonModule,
    IsMyProfileModule,
    FormsModule,
  ],
  exports: [AvatarComponent, BgComponent,
    UpdateUserComponent, UserInitComponent,
    FirstNameComponent, LastNameComponent, ImgComponent ],
  providers: [UserService],
  declarations: [AvatarComponent, BgComponent,
    UpdateUserComponent, UserInitComponent,
    FirstNameComponent, LastNameComponent, ImgComponent]
})
export class UserModule { }
