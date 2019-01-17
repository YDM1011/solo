import {Directive, ElementRef} from '@angular/core';
import {CoreService} from "../../core.service";


@Directive({
  selector: '[isMyProfile]'
})
export class IsMyProfileDirective {

  constructor(
    el: ElementRef,
    core: CoreService
  ) {
    //noinspection TypeScriptUnresolvedVariable
    core.onGetValid.subscribe(val=>{
      console.log("directive",el);
      if(!val){
        //noinspection TypeScriptUnresolvedVariable
        el.nativeElement.hidden = true;
      }else{
        //noinspection TypeScriptUnresolvedVariable
        el.nativeElement.hidden = false;
      }
      return val ? false : true
    })
  }
}
