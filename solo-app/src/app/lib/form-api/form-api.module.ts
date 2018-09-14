import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../form-api/form/form.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [FormComponent],
  declarations: [FormComponent]
})
export class FormApiModule { }
