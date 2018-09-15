import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostComponent} from "./post/post.component";
import { CreateComponent } from './create/create.component';
import {FormsModule} from "@angular/forms";
import {UploadModule} from "../upload/upload.module";
import {PostService} from "./post.service";
import {FormApiModule} from "../form-api/form-api.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormApiModule,
    UploadModule
  ],
  providers: [PostService],
  exports: [PostComponent, CreateComponent],
  declarations: [PostComponent, CreateComponent]
})
export class PostModule { }
