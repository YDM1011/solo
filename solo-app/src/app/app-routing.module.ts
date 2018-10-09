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
import {InitLayoutComponent} from "./init-layout/init-layout.component";
import {ConfirmComponent} from "./confirm/confirm.component";
const routes: Routes = [
  { path: '',
    component: InitLayoutComponent,

    children: [
      {path:'user/:id', component:DashboardComponent, canActivate: [IsLoginedGuard],}

    ]
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [IsLogoutGuard]
  },
  {
    path: 'about',
    component: LandingPageComponent,
    canActivate: [IsLogoutGuard]
  },
  {
    path: 'confirm',
    component: ConfirmComponent,
    canActivate: [IsLogoutGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [IsLogoutGuard]
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
