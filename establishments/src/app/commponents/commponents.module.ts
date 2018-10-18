import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgComponent } from './img/img.component';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ImgComponent],
  declarations: [ImgComponent]
})
export class CommponentsModule { }
