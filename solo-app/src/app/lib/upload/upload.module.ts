import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import {UploadService} from "./upload.service";

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[UploadComponent],
  declarations: [UploadComponent],
  providers: [UploadService]
})
export class UploadModule { }
