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
import { ImageCropperModule } from 'ngx-image-cropper';
import { PrevDishComponent } from './prev-dish/prev-dish.component';
import { WorkTimeCreateComponent } from './work-time-create/work-time-create.component';
import { WorkTimeEditComponent } from './work-time-edit/work-time-edit.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { LoadActionComponent } from './load-action/load-action.component';
import { ActionCreateComponent } from './action-create/action-create.component';
import { ActionEditComponent } from './action-edit/action-edit.component';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    FormsModule,
    ImageCropperModule,
    TimepickerModule.forRoot(),
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
    MapComponent,
    PrevDishComponent,
    WorkTimeCreateComponent,
    WorkTimeEditComponent,
    CalendarComponent,
    LoadActionComponent,
    ActionCreateComponent,
    ActionEditComponent
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
    PortionComponent,
    PrevDishComponent,
    WorkTimeCreateComponent,
    WorkTimeEditComponent,
    CalendarComponent,
    LoadActionComponent,
    ActionCreateComponent,
    ActionEditComponent
  ],
  providers: []
})

export class CommponentsModule { }
