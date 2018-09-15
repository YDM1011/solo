import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MzCollapsibleModule, MzDropdownModule, MzInputModule, MzRadioButtonModule} from "ngx-materialize";
import { SearchGlobalComponent } from './search-global/search-global.component';
import { SearchSelectComponent } from './search-select/search-select.component';


@NgModule({
  imports: [
    CommonModule,
    MzInputModule,
    MzDropdownModule,
    MzCollapsibleModule,
    MzRadioButtonModule
  ],
  exports: [SearchGlobalComponent, SearchSelectComponent],
  declarations: [SearchGlobalComponent, SearchSelectComponent]
})
export class SearchModule { }
