import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appRightBarScroll]'
})
export class RightBarScrollDirective {

  constructor (private el:ElementRef) {}

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, false);
    window.addEventListener('resize', this.resize, false);
    this.paramPush()
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, false);
    window.removeEventListener('resize', this.resize, false);
  }
  public scrollPosition: number = 0;
  public headHeight: number = 59;
  public docWidth = document.documentElement.clientWidth;
  public docHeight = document.documentElement.clientHeight;
  public barH: number = 0;
  public max: number = 0;
  public pageY: number = 59;
  public status;

  paramPush (): void {
    this.barH = this.el.nativeElement.offsetHeight;
    this.max = this.barH - this.docHeight;
    this.status = (this.docHeight < this.barH);
  }

  scroll = (): void => {

    if (this.docWidth < 992 && this.docHeight < 500) return;

    if (this.status) (this.scrollPosition < window.pageYOffset) ? this.bottom(window.pageYOffset) : this.top(window.pageYOffset);

    this.scrollPosition = window.pageYOffset;

  };

  resize = (): void => {
    this.docHeight = document.documentElement.clientHeight;
    this.paramPush ()
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
