import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MzBadgeModule} from "ngx-materialize";
import { UserLinkComponent } from './user-link/user-link.component';

@NgModule({
  imports: [
    CommonModule,
    MzBadgeModule

  ],
  exports: [
    UserLinkComponent
  ],
  declarations: [UserLinkComponent]
})
export class UserModule { }
