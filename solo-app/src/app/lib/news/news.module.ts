import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import {MzBadgeModule} from "ngx-materialize";

@NgModule({
  imports: [
    CommonModule,
    MzBadgeModule
  ],
  exports: [
    NewsComponent
  ],
  declarations: [NewsComponent]
})
export class NewsModule { }
