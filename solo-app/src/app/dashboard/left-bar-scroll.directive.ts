import {Directive, ElementRef, Input, ViewChild} from '@angular/core';

@Directive({
  selector: '[appLeftBarScroll]'
})
export class LeftBarScrollDirective {

  constructor (private el:ElementRef) {}
  @Input ('appLeftBarScroll') bar: any;

  ngOnInit() {
    if ( document.documentElement.clientWidth > 768 && document.documentElement.clientHeight > 500) window.addEventListener('scroll', this.scroll, false);
  }
  ngOnDestroy() {
    if ( document.documentElement.clientWidth > 768 && document.documentElement.clientHeight > 500) window.removeEventListener('scroll', this.scroll, false);
  }

  private scrollPosition: number = 0;
  private pageY: number = 0;
  private hrhHeight: number = ( document.documentElement.clientWidth >= 922 && document.documentElement.clientHeight >= 500 ) ? 64 : 96;

  scroll = (): void => {
      this.scrollPosition = window.pageYOffset;
      this.pageY = this.bar.y + this.scrollPosition - this.hrhHeight;
      (this.pageY <= this.scrollPosition) ? this.fixed() : this.static();
  };

  private fixed() {
     this.el.nativeElement.classList.add('fx');
  }
  private static() {
    this.el.nativeElement.classList.remove('fx');
  }
}
