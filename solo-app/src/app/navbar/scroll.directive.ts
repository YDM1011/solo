import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {

  constructor (private el:ElementRef) {}

  ngOnInit() {
    window.addEventListener('touchstart', this.touchS, true);
    window.addEventListener('touchmove', this.touch, true);
    window.addEventListener('touchend', this.touchE, true);
  }

  ngOnDestroy() {
    window.removeEventListener('touchstart', this.touchS, true);
    window.removeEventListener('touchmove', this.touch, true);
    window.removeEventListener('touchend', this.touchE, true);
  }

  public start: number;
  public end: number;


  touchS = ($event): void => {
    this.start = $event.changedTouches[0].pageY;
  };

  touch = ($event): void => {
    let move;
    move = $event.changedTouches[0].pageY;
    ( window.pageYOffset < 70 || this.start < move) ?  this.el.nativeElement.classList.add('active') : this.el.nativeElement.classList.remove('active');
  };

  touchE = ($event): void => {
    this.end = $event.changedTouches[0].pageY;
  }
}
