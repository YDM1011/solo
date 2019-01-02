import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appScrollTo]'
})
export class ScrollToDirective {

  constructor() {}
  ngOnInit() {
    this.leveler();
  }

  @HostListener('click', ['$event']) onClick(): void {

    window.scrollBy(0, this.top());
  }

  leveler() {
    this.minisH = (window.innerWidth < 500 || window.innerHeight < 500 ) ?
      0 : document.querySelector('.hdr').clientHeight + 10;
  }
  minisH: number = 0;

  top(): number {
    return document.getElementById('contTape').getBoundingClientRect().top - this.minisH;
  }
}
