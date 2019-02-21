import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appRightBarScroll]'
})
export class RightBarScrollDirective {

  constructor (private el:ElementRef) {}

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, false);
    window.addEventListener('orientationchange', this.resize, true);
    this.paramPush();
  }
  ngOnChanges() {
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, false);
    window.removeEventListener('orientationchange', this.resize, true);

  }
  public scrollPosition: number = 0;

  public barH: number;
  public max: number;
  public height: number = 0;
  public hdrHeiht: number;

  paramPush (): void {
    this.barH = this.el.nativeElement.offsetHeight;
    this.hdrHeiht = document.querySelector('nav').clientHeight;
    let max = this.barH - (window.innerHeight - this.hdrHeiht);
    this.max = (max > 0) ? max : 0;
  }
  load = (): void => {
    this.paramPush();
  };
  scroll = (): void => {
    if (this.barH !== this.el.nativeElement.offsetHeight) this.paramPush();
    if (window.innerWidth < 992) return;
    (this.scrollPosition <= window.pageYOffset) ? this.bottom(window.pageYOffset) : this.top(window.pageYOffset);
    this.scrollPosition = window.pageYOffset;
  };
  resize = (): void => {
    this.paramPush();
  };
  private bottom(posScroll: number) {
    let temp = this.height + (posScroll - this.scrollPosition);
    this.height = (temp < this.max) ? temp : this.max;
    this.el.nativeElement.style.top = `${ this.hdrHeiht - this.height}px`;
  }
  private top(posScroll: number) {
    this.height = this.height - (this.scrollPosition - posScroll);
    this.height = (this.height > 0 ) ? this.height : 0;
    this.el.nativeElement.style.top = `${this.hdrHeiht - this.height}px`;
  }
}
