import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RoutingModule } from "../routing/routing.module";
import { AvatarComponent } from './avatar/avatar.component';
import { BgComponent } from './bg/bg.component';
import { SubdomainComponent } from './subdomain/subdomain.component';
import { MobileComponent } from './mobile/mobile.component';
import { UploadComponent } from './upload/upload.component';
import { FileMinComponent } from './file-min/file-min.component';
import { ImgComponent } from './img/img.component';
import { PicComponent } from './pic/pic.component';
import { SelectComponent } from './select/select.component';
import { CheckOptionComponent } from './check-option/check-option.component';
import {FormsModule} from "@angular/forms";
import { MapComponent } from './map/map.component';
import { PortionComponent } from './portion/portion.component';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    AvatarComponent,
    BgComponent,
    SubdomainComponent,
    MobileComponent,
    UploadComponent,
    FileMinComponent,
    ImgComponent,
    PicComponent,
    SelectComponent,
    CheckOptionComponent,
    MapComponent
  ],
  declarations: [
    HeaderComponent,
    AvatarComponent,
    BgComponent,
    SubdomainComponent,
    MobileComponent,
    UploadComponent,
    FileMinComponent,
    ImgComponent,
    PicComponent,
    SelectComponent,
    CheckOptionComponent,
    MapComponent,
    PortionComponent
  ],
  providers: []
})

export class CommponentsModule { }
