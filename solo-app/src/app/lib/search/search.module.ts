import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import {FormsModule} from "@angular/forms";
import { SearchPipe } from './search.pipe';
import {MzDropdownModule} from "ngx-materialize";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MzDropdownModule
  ],
  exports: [SearchComponent],
  declarations: [SearchComponent, SearchPipe]
})
export class SearchModule { }
