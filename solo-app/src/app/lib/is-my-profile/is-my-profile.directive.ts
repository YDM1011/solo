import {Directive, ElementRef, EventEmitter, Output} from '@angular/core';
import {CoreService} from "../../core.service";


@Directive({
  selector: '[isMyProfile]'
})
export class IsMyProfileDirective {

  @Output() onValid: EventEmitter<any> = new EventEmitter();
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
      }else{
        //noinspection TypeScriptUnresolvedVariable
        el.nativeElement.style.display = "";
      }
      this.onValid.emit(val);
    })
  }
}
