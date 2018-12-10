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
import { CommentComponent } from './comment/comment.component';
import {AppRoutingModule} from "../../app-routing.module";
import {UserModule} from "../user/user.module";
import {SweetAlert2Module} from "@toverux/ngx-sweetalert2";
import {CreatePostDirective} from "./create/create-post.directive";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormApiModule,
    UploadModule,
    MzCollapsibleModule,
    SearchModule,
    IsMyProfileModule,
    AppRoutingModule,
    UserModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [PostService],
  exports: [PostComponent, CreateComponent],
  declarations: [PostComponent, CreateComponent, LikeComponent, CommentComponent,CreatePostDirective]
})
export class PostModule { }
