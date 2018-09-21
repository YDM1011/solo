import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostComponent} from "./post/post.component";
import { CreateComponent } from './create/create.component';
import {FormsModule} from "@angular/forms";
import {UploadModule} from "../upload/upload.module";
import {PostService} from "./post.service";
import {FormApiModule} from "../form-api/form-api.module";
import {MzCollapsibleModule} from "ngx-materialize";
import {SearchModule} from "../search/search.module";
import {IsMyProfileModule} from "../is-my-profile/is-my-profile.module";
import { LikeComponent } from './like/like.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormApiModule,
    UploadModule,
    MzCollapsibleModule,
    SearchModule,
    IsMyProfileModule
  ],
  providers: [PostService],
  exports: [PostComponent, CreateComponent],
  declarations: [PostComponent, CreateComponent, LikeComponent]
})
export class PostModule { }
