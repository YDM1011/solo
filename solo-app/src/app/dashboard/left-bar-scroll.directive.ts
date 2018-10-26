import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appLeftBarScroll]'
})
export class LeftBarScrollDirective {

  constructor (private el:ElementRef) {}
  @Input ('appLeftBarScroll') bar: any;

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, false);
    this.headHeight();
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, false);
    this.headHeight();
  }

  private scrollPosition: number = 0;
  private pageY: number = 0;
  private docWidth = document.documentElement.clientWidth;
  private docHeight = document.documentElement.clientHeight;
  private hrhHeight: number = 0;

  headHeight() {
    this.hrhHeight = (this.docWidth >= 922 && this.docHeight >= 500 ) ? 64 : 96;
  }

  scroll = (): void => {
    if (this.docWidth < 768 && this.docHeight < 500) return;
    this.scrollPosition = window.pageYOffset;

    this.pageY = (this.bar.y ^ 0) + this.scrollPosition - this.hrhHeight;

    ( this.pageY <= this.scrollPosition ) ? this.fixed( ) : this.static();

  };

  private fixed() {
     this.el.nativeElement.classList.add('fx');
  }
  private static() {
    this.el.nativeElement.classList.remove('fx');
  }
}
