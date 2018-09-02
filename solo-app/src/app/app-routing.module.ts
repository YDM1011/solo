import {NgModule, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./not-found/not-found.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {IsLoginedGuard} from "./is-logined.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SigninComponent} from "./signin/signin.component";
const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'signin',
    component: SigninComponent,
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
