import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appLeftBarScroll]'
})
export class LeftBarScrollDirective {
  public bar: HTMLElement;
  constructor (private el:ElementRef) {}

  ngOnInit() {
    if ( window.innerWidth >= 768 && window.innerHeight > 500) window.addEventListener('scroll', this.scroll, false);
    this.hrhHeight = document.querySelector('nav').clientHeight +5;
    this.bar = document.querySelector('.cont_left-bar');
    window.addEventListener('orientationchange', this.orientation, true);
  }
  ngOnDestroy() {
    if ( window.innerWidth >= 768 && window.innerHeight > 500) window.removeEventListener('scroll', this.scroll, false);
    window.removeEventListener('orientationchange', this.orientation, true);
  }
  private pageY: number = 0;
  private hrhHeight: number = 0;

  orientation = (): void => {
    this.el.nativeElement.style.width = this.bar.clientWidth + 'px';
    this.hrhHeight = document.querySelector('nav').clientHeight + 5;
  };
  scroll = (): void => {
    this.pageY = this.bar.getBoundingClientRect().top + window.pageYOffset - this.hrhHeight;
    (this.pageY <= window.pageYOffset && window.pageYOffset > 0) ? this.fixed() : this.static();
  };

  private fixed() {
    this.el.nativeElement.classList.add('fx');
  }
  private static() {
    this.el.nativeElement.classList.remove('fx');
  }
}
