import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import {MzBadgeModule} from "ngx-materialize";

@NgModule({
  imports: [
    CommonModule,
    MzBadgeModule
  ],
  exports: [BasketComponent],
  declarations: [BasketComponent]
})
export class BasketModule { }
