import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {

  constructor (private el:ElementRef) {}
  private status: boolean = ( window.innerWidth < 922 &&  window.innerHeight < 992);

  ngOnInit() {
    if (this.status){
      window.addEventListener('scroll', this.scroll, false);
      window.addEventListener('touchstart', this.touchS, false);
      this.elHeight = this.el.nativeElement.offsetHeight;
    }
  }

  ngOnDestroy() {
    if (this.status) {
      window.removeEventListener('scroll', this.scroll, false);
      window.removeEventListener('touchstart', this.touchS, false);
    }
  }

  private start: number;
  private scrollPos: number = 10000;
  private elHeight: number = 0;


  scroll = (): void => {
    ( window.pageYOffset <=  this.elHeight ) ? this.open( 0, '.1s') :
      ( window.pageYOffset <= this.scrollPos - 20 ) ? this.open(0, '.2s') : ( window.pageYOffset > this.scrollPos + 10 ) ? this.close(this.elHeight, '.25s') : '';

  };

  touchS = ($event): void => {
    this.start = $event.changedTouches[0].pageY;
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
