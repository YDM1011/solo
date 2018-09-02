import {NgModule, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {IsLoginedGuard} from "./is-logined.guard";
const routes: Routes = [
  { path: '', component: AppComponent },
  {
    path: 'test',
    component: NavbarComponent,
    canActivate: [IsLoginedGuard]
  },
  {
    path: 'dashboard',
    component: NavbarComponent,
    canActivate: [IsLoginedGuard]
  },
  { path: '**', component: NotFoundComponent }
];
@NgModule({
  exports: [ RouterModule ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule {
  @Input() link;
  routes = this.link;
}
