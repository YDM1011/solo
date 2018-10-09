import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IsMyProfileDirective} from "./is-my-profile.directive";

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [IsMyProfileDirective],
  declarations: [IsMyProfileDirective]
})
export class IsMyProfileModule { }
