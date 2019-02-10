import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import { SearchPipe } from './search.pipe';
import {MzDropdownModule} from "ngx-materialize";
import {RoutingModule} from "../routing/routing.module";
import {SearchComponent} from "./search.component";
import {ImgComponent} from "./img/img.component";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MzDropdownModule,
    RoutingModule
  ],
  exports: [SearchComponent],
  declarations: [ SearchComponent, ImgComponent, SearchPipe]
})
export class SearchModule { }
