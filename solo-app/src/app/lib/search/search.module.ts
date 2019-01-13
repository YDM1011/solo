import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import {FormsModule} from "@angular/forms";
import { SearchPipe } from './search.pipe';
import {MzDropdownModule} from "ngx-materialize";
import {ImgComponent} from "../img/img.component";
import {UserModule} from "../user/user.module";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MzDropdownModule,
    UserModule
  ],
  exports: [SearchComponent],
  declarations: [SearchComponent, SearchPipe]
})
export class SearchModule { }
