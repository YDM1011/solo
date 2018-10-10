import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import {UploadService} from "./upload.service";
import {IsMyProfileModule} from "../is-my-profile/is-my-profile.module";
import {FileMinModule} from "../file-min/file-min.module";

@NgModule({
  imports: [
    CommonModule,
    IsMyProfileModule,
    FileMinModule
  ],
  exports:[UploadComponent],
  declarations: [UploadComponent],
  providers: [UploadService]
})
export class UploadModule {  }
