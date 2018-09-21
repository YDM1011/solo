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
    console.log(el.nativeElement );
    core.onGetValid.subscribe(val=>{
      if(!val){
        //noinspection TypeScriptUnresolvedVariable
        el.nativeElement.style.display = 'none';
      }else{
        //noinspection TypeScriptUnresolvedVariable
        el.nativeElement.style.display = 'block';
      }
    })
  }
}
