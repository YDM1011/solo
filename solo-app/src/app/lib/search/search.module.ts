import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import {MzDropdownModule, MzInputModule} from "ngx-materialize";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  imports: [
    CommonModule,
    MzInputModule,
    BrowserAnimationsModule,
    MzDropdownModule
  ],
  exports: [SearchComponent],
  declarations: [SearchComponent]
})
export class SearchModule { }
