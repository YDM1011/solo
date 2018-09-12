import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MzBadgeModule} from "ngx-materialize";
import { BasketLinkComponent } from './basket-link/basket-link.component';

@NgModule({
  imports: [
    CommonModule,
    MzBadgeModule
  ],
  exports: [
    BasketLinkComponent
  ],
  declarations: [BasketLinkComponent]
})
export class BasketModule { }
