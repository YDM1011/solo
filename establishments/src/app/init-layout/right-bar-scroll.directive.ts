import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appRightBarScroll]'
})
export class RightBarScrollDirective {

  constructor (private el:ElementRef) {}

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, false);
    window.addEventListener('resize', this.resize, false);
    this.paramPush(this.el.nativeElement.offsetHeight);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, false);
    window.removeEventListener('resize', this.resize, false);
  }
  public scrollPosition: number = 0;

  public barH: number = 0;
  public max: number = 0;
  public height: number = 0;

  paramPush (offsetH: number): void {
    this.barH = offsetH;
    this.max = this.barH - (window.innerHeight - 60);
  }
  load = (): void => {
    this.paramPush(this.el.nativeElement.offsetHeight);
  };
  scroll = (): void => {
    if (this.barH !== this.el.nativeElement.offsetHeight) this.paramPush (this.el.nativeElement.offsetHeight);
    if (window.innerWidth < 992) return;

    (this.scrollPosition <= window.pageYOffset) ? this.bottom(window.pageYOffset) : this.top(window.pageYOffset);
    this.scrollPosition = window.pageYOffset;
  };
  resize = (): void => {
    this.paramPush (this.el.nativeElement.offsetHeight)
  };
  private bottom(posScroll: number) {
    let temp = this.height + (posScroll - this.scrollPosition);
    this.height = (temp < this.max) ? temp : this.max;
    this.el.nativeElement.style.transform = `translateY(-${this.height}px)`;
  }
  private top(posScroll: number) {
    this.height = this.height - (this.scrollPosition - posScroll);
    this.height = (this.height > 0 ) ? this.height : 0;
    this.el.nativeElement.style.transform = `translateY(-${this.height}px)`;
  }
}
