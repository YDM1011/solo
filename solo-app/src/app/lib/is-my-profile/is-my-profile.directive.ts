import {Directive, ElementRef, EventEmitter, Output} from '@angular/core';
import {CoreService} from "../../core.service";


@Directive({
  selector: '[isMyProfile]'
})
export class IsMyProfileDirective {
  @Output() myProf: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    el: ElementRef,
    core: CoreService
  ) {
    //noinspection TypeScriptUnresolvedVariable
    core.onGetValid.subscribe(val=>{
      console.log("directive",el,val);
      if(!val){
        //noinspection TypeScriptUnresolvedVariable
        el.nativeElement.style.display = "none";
        this.myProf.emit(false);
      }else{
        //noinspection TypeScriptUnresolvedVariable
        el.nativeElement.style.display = "";
        this.myProf.emit(true);
      }
    })
  }
}
