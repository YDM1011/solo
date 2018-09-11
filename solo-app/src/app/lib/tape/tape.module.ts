import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TapeComponent } from './tape.component';
import {MzBadgeModule} from "ngx-materialize";

@NgModule({
  imports: [
    CommonModule,
    MzBadgeModule
  ],
  exports: [
    TapeComponent
  ],
  declarations: [TapeComponent]
})
export class TapeModule { }
