import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {IsLogoutGuard} from "./is-logout.guard";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {SigninComponent} from "./signin/signin.component";
import {IsLoginedGuard} from "./is-logined.guard";
import {CheckBoxComponent} from "./pages/check-box/check-box.component";
import {HomeComponent} from "./pages/home/home.component";
import {CategoryComponent} from "./pages/category/category.component";

const routes: Routes = [
  { path: '',
    component: LayoutComponent,
    canActivate: [IsLoginedGuard],
    children: [{path:'', component: HomeComponent},
      {path:'checkbox', component: CheckBoxComponent},
      {path:'category', component: CategoryComponent}
      ]
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [IsLogoutGuard]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
