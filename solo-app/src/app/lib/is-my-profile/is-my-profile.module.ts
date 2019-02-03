import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IsMyProfileDirective} from "./is-my-profile.directive";
import {IsNotMeDirective} from "./is-not-me.directive";

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    IsMyProfileDirective,
    IsNotMeDirective
  ],
  declarations: [
    IsMyProfileDirective,
    IsNotMeDirective
  ]
})

export class IsMyProfileModule { }
