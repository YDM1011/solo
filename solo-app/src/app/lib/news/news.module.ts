import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MzBadgeModule} from "ngx-materialize";
import { NewsLinkComponent } from './news-link/news-link.component';

@NgModule({
  imports: [
    CommonModule,
    MzBadgeModule
  ],
  exports: [
    NewsLinkComponent
  ],
  declarations: [NewsLinkComponent]
})
export class NewsModule { }
