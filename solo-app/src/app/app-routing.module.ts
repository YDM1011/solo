import {NgModule, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {IsLoginedGuard} from './is-logined.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SigninComponent} from './signin/signin.component';
import {IsLogoutGuard} from './is-logout.guard';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {SignupComponent} from './signup/signup.component';
import {InitLayoutComponent} from './init-layout/init-layout.component';
import {ConfirmComponent} from './confirm/confirm.component';
import {BasketComponent} from './basket/basket.component';
import {ProfileComponent} from "./profile/profile.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {FriendPageComponent} from "./friend-page/friend-page.component";
import {GaleryPageComponent} from "./galery-page/galery-page.component";
import {FriendOfferPageComponent} from "./friend-offer-page/friend-offer-page.component";
const routes: Routes = [
  { path: '',
    component: InitLayoutComponent,
    children: [
      {path: 'user/:id', component: DashboardComponent, canActivate: [IsLoginedGuard], children: [
          {path: '', component: HomePageComponent, canActivate: [IsLoginedGuard], },
          {path: 'basket', component: BasketComponent, canActivate: [IsLoginedGuard], },
          {path: 'friends', component: FriendPageComponent, canActivate: [IsLoginedGuard], },
          {path: 'friends_offer', component: FriendOfferPageComponent, canActivate: [IsLoginedGuard], },
          {path: 'galery', component: GaleryPageComponent, canActivate: [IsLoginedGuard], },
          {path: 'profile', component: ProfileComponent, canActivate: [IsLoginedGuard], },
        ]}
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
