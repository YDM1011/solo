import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appScrollTo]'
})
export class ScrollToDirective {

  constructor(private el: ElementRef) { }
  @Input() targetScroll: string;

  @HostListener('click', ['$event']) onClick(): void {
    setTimeout( ()=> {
      document.querySelector('.scroll').scrollIntoView({block: "start", behavior: "smooth"});
      // @ts-ignore
      document.querySelector('.scroll').style.paddingTop = '60px';
      // @ts-ignore
      document.querySelector('.scroll').style.display = 'block';
    },0)
  }
}
