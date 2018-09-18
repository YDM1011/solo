import {NgModule, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./not-found/not-found.component";
import {IsLoginedGuard} from "./is-logined.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SigninComponent} from "./signin/signin.component";
import {IsLogoutGuard} from "./is-logout.guard";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {SignupComponent} from "./signup/signup.component";
const routes: Routes = [
  { path: '',
    component: LandingPageComponent,
    canActivate: [IsLogoutGuard]
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [IsLogoutGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [IsLogoutGuard]
  },
  {
    path: 'user/:id',
    component: DashboardComponent,
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
