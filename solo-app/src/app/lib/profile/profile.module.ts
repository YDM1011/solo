import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {MzBadgeModule} from "ngx-materialize";

@NgModule({
  imports: [
    CommonModule,
    MzBadgeModule

  ],
  exports: [
    ProfileComponent
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
