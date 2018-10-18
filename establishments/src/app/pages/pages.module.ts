import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [PostsComponent],
  declarations: [NotFoundComponent, PostsComponent]
})
export class PagesModule { }
