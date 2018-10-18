import { NgModule, Input } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "../pages/not-found/not-found.component";
import { InitLayoutComponent } from "../init-layout/init-layout.component";
import { PostsComponent } from "../pages/posts/posts.component";
const routes: Routes = [
  { path: '',
    component: InitLayoutComponent,
    children: [
      {path:'m', component:PostsComponent}
    ]
  },
  { path: '**', component: NotFoundComponent }
];
@NgModule({
  exports: [ RouterModule ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  declarations: []
})
export class RoutingModule {
  @Input() link;
  routes = this.link;
}
