import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {

  constructor (private el:ElementRef) {}
  status: boolean = ( window.innerWidth < 992 &&  window.innerHeight < 550) || ( window.innerWidth < 500 &&  window.innerHeight < 992);
  scrollPos: number = 10000;
  elHeight: number;

  ngOnInit() {
    if (this.status){
      window.addEventListener('scroll', this.scroll, false);
      document.body.addEventListener('touchstart', this.touchS, false);
      this.elHeight = this.el.nativeElement.offsetHeight;
    }
  }

  ngOnDestroy() {
    if (this.status) {
      window.removeEventListener('scroll', this.scroll, false);
      document.body.removeEventListener('touchstart', this.touchS, false);
    }
  }

  scroll = (): void => {
    ( window.pageYOffset <  this.elHeight ) ? this.open( 0, '.1s') :
      ( window.pageYOffset <= this.scrollPos - 20 ) ? this.open(0, '.2s') : ( window.pageYOffset > this.scrollPos + 10 ) ? this.close(this.elHeight, '.25s') : '';
  };

  touchS = (): void => {
    this.scrollPos = window.pageYOffset;
  };

  private open(height, speed: string) {
    this.el.nativeElement.style.transform = 'translateY(' + height + 'px)';
    this.el.nativeElement.style.transition = speed + ' ease-out';
  }
  private close(height, speed: string) {
    this.el.nativeElement.style.transform = 'translateY( -' + height + 'px)';
    this.el.nativeElement.style.transition = speed + ' ease-out';
  }
}
