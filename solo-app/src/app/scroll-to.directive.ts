import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appScrollTo]'
})
export class ScrollToDirective {

  constructor(private el: ElementRef) { }
  @Input() targetScroll: string;

  @HostListener('click', ['$event']) onClick(): void {
    setTimeout( ()=> {
      document.querySelector('.' + this.targetScroll).scrollIntoView({block: "start", behavior: "smooth"});
    },100)
  }
}
