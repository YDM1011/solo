import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LayoutComponent } from './layout/layout.component';
import {FormsModule} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "./auth.service";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {ApiInterceptor} from "./api-interceptor";
import { SidebarComponent } from './commponents/sidebar/sidebar.component';
import { CheckBoxComponent } from './pages/check-box/check-box.component';
import { HomeComponent } from './pages/home/home.component';
import { CheckBoxCreateComponent } from './commponents/check-box-create/check-box-create.component';
import { CheckBoxAllComponent } from './commponents/check-box-all/check-box-all.component';
import { CheckBoxEditComponent } from './commponents/check-box-edit/check-box-edit.component';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryAllComponent } from './commponents/category-all/category-all.component';
import { CategoryCreateComponent } from './commponents/category-create/category-create.component';
import { CategoryEditComponent } from './commponents/category-edit/category-edit.component';
import { ModerationComponent } from './pages/moderation/moderation.component';
import { FiltersComponent } from './pages/filters/filters.component';
import { FiltersAllComponent } from './commponents/filters-all/filters-all.component';
import { FiltersCreateComponent } from './commponents/filters-create/filters-create.component';
import { FiltersEditComponent } from './commponents/filters-edit/filters-edit.component';
import { AcardionDirective } from './directive/acardion.directive';
import { BtnBurgerDirective } from './directive/btn-burger.directive';
import { PopapDirective } from './directive/popap.directive';
import { ChecklistComponent } from './commponents/checklist/checklist.component';
import { SearchComponent } from './commponents/search/search.component';
import { UserListComponent } from './commponents/user-list/user-list.component';
import { LabelsComponent } from './pages/labels/labels.component';
import { LabelsAllComponent } from './commponents/labels-all/labels-all.component';
import { LabelsCreateComponent } from './commponents/labels-create/labels-create.component';
import { LabelsEditComponent } from './commponents/labels-edit/labels-edit.component';
import { FudcoinComponent } from './pages/fudcoin/fudcoin.component';
import {SweetAlert2Module} from "@toverux/ngx-sweetalert2";

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    NotFoundComponent,
    LayoutComponent,
    SidebarComponent,
    CheckBoxComponent,
    HomeComponent,
    CheckBoxCreateComponent,
    CheckBoxAllComponent,
    CheckBoxEditComponent,
    CategoryComponent,
    CategoryAllComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    ModerationComponent,
    FiltersComponent,
    FiltersAllComponent,
    FiltersCreateComponent,
    FiltersEditComponent,
    AcardionDirective,
    BtnBurgerDirective,
    PopapDirective,
    ChecklistComponent,
    SearchComponent,
    UserListComponent,
    LabelsComponent,
    LabelsAllComponent,
    LabelsCreateComponent,
    LabelsEditComponent,
    FudcoinComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true
  },
    AuthService, CookieService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
