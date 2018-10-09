import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../form-api/form/form.component';
import {FormsModule} from "@angular/forms";
import {IsMyProfileModule} from "../is-my-profile/is-my-profile.module";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    IsMyProfileModule
  ],
  exports: [FormComponent],
  declarations: [FormComponent]
})
export class FormApiModule { }
