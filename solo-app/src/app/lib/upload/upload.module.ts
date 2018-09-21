import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import {UploadService} from "./upload.service";
import {IsMyProfileModule} from "../is-my-profile/is-my-profile.module";

@NgModule({
  imports: [
    CommonModule,
    IsMyProfileModule
  ],
  exports:[UploadComponent],
  declarations: [UploadComponent],
  providers: [UploadService]
})
export class UploadModule {  }
