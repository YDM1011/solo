import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appLeftBarScroll]'
})
export class LeftBarScrollDirective {

  constructor (private el:ElementRef) {}
  @Input ('appLeftBarScroll') bar: any;

  ngOnInit() {
    if ( window.innerWidth >= 768 && window.innerHeight > 500) window.addEventListener('scroll', this.scroll, false);
    if ( window.innerWidth >= 768 && window.innerHeight > 500) window.addEventListener('resize', this.resize, false);
    this.hrhHeight = document.querySelector('nav').clientHeight +5;

  }
  ngOnDestroy() {
    if ( window.innerWidth >= 768 && window.innerHeight > 500) window.removeEventListener('scroll', this.scroll, false);
    if ( window.innerWidth >= 768 && window.innerHeight > 500) window.removeEventListener('resize', this.resize, false);
  }
  private pageY: number = 0;
  private hrhHeight: number = 0;

  resize = (): void => {
    this.hrhHeight = document.querySelector('nav').clientHeight + 5;
  };

  scroll = (): void => {
    this.pageY = this.bar.y + window.pageYOffset - this.hrhHeight;
    (this.pageY <= window.pageYOffset) ? this.fixed() : this.static();
  };

  private fixed() {
    this.el.nativeElement.classList.add('fx');
  }
  private static() {
    this.el.nativeElement.classList.remove('fx');
  }
}
