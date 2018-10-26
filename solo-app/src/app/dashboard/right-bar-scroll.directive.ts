import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appRightBarScroll]'
})
export class RightBarScrollDirective {

  @Input('appRightBarScroll') barHeight: any;
  constructor (private el:ElementRef) {}

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, false);
    window.addEventListener('resize', this.resize, false);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, false);
    window.removeEventListener('resize', this.resize, false);
  }
  private scrollPosition: number = 0;
  private headHeight: number = 59;
  private docWidth = document.documentElement.clientWidth;
  private docHeight = document.documentElement.clientHeight;
  public barH: number;
  private max: number = 0;
  private pageY: number = 59;

  scroll = (): void => {

    if (this.docWidth < 992 && this.docHeight < 500) return;
    this.barH = this.barHeight.clientHeight;
    this.max = this.barH - this.docHeight;
    if (this.docHeight < this.barH ) {
      (this.scrollPosition < window.pageYOffset) ? this.bottom(window.pageYOffset) : this.top(window.pageYOffset);
    }

    this.scrollPosition = window.pageYOffset;

  };

  resize = (): void => {
    this.docHeight = document.documentElement.clientHeight;
  };
  private bottom(posScroll: number) {
    let ss = posScroll - this.scrollPosition;
    let tmp = this.pageY - ss;
    this.pageY = ( tmp >  - this.max) ? tmp : -this.max;
    this.el.nativeElement.style.top = this.pageY + 'px';
  }
  private top(posScroll: number) {
    let ss = this.scrollPosition - posScroll;
    let tmp = this.pageY + ss;
    this.pageY = (tmp < this.headHeight) ? tmp : this.headHeight;
    this.el.nativeElement.style.top = this.pageY + 'px';
  }

}
