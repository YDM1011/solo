import {Directive, ElementRef, EventEmitter, Output} from '@angular/core';
import {CoreService} from "../../core.service";


@Directive({
  selector: '[IsNotMe]'
})
export class IsNotMeDirective {

  constructor(
    el: ElementRef,
    core: CoreService
  ) {
    //noinspection TypeScriptUnresolvedVariable
    core.onGetValid.subscribe(val=>{
      console.log("isNotMe",el,val);
      if(val){
        //noinspection TypeScriptUnresolvedVariable
        el.nativeElement.style.display = "none";
      }else{
        //noinspection TypeScriptUnresolvedVariable
        el.nativeElement.style.display = "";
      }
    })
  }
}
