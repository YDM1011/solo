import {Directive, ElementRef, Input, ViewChild} from '@angular/core';

@Directive({
  selector: '[appLeftBarScroll]'
})
export class LeftBarScrollDirective {

  constructor (private el:ElementRef) {}
  @Input ('appLeftBarScroll') bar: any;

  ngOnInit() {
    if ( window.innerWidth > 768 && window.innerHeight > 500) window.addEventListener('scroll', this.scroll, false);
  }
  ngOnDestroy() {
    if ( window.innerWidth > 768 && window.innerHeight > 500) window.removeEventListener('scroll', this.scroll, false);
  }
  private pageY: number = 0;
  private hrhHeight: number = ( window.innerWidth >= 922 && window.innerHeight >= 500 ) ? 64 : 96;

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
