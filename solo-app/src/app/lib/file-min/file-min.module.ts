import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileMinComponent } from './file-min.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    FileMinComponent
  ],
  declarations: [FileMinComponent]
})
export class FileMinModule { }
