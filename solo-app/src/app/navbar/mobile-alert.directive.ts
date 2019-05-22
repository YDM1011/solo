import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appMobileAlert]'
})
export class MobileAlertDirective {

  constructor(private el:ElementRef) { }
  ngOnInit() {
    document.getElementsByTagName('nav')[0].style.top = '30px';
    // @ts-ignore
    document.getElementsByClassName('cont_right-bar')[0].style.top = '89px';

  }
  ngOnDestroy(){
    document.getElementsByTagName('nav')[0].style.top = '0';
    // @ts-ignore
    document.getElementsByClassName('cont_right-bar')[0].style.top = '59px';
  }
}
// transform: translateY(-30px);
// transition: .5s;
