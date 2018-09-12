import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MzBadgeModule} from "ngx-materialize";
import { TapeLinkComponent } from './tape-link/tape-link.component';

@NgModule({
  imports: [
    CommonModule,
    MzBadgeModule
  ],
  exports: [
    TapeLinkComponent
  ],
  declarations: [TapeLinkComponent]
})
export class TapeModule { }
