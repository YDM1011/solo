import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileMinComponent } from './file-min.component';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    ImageCropperModule
  ],
  exports:[
    FileMinComponent
  ],
  declarations: [FileMinComponent]
})
export class FileMinModule { }
