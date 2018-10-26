import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {

  constructor (private el:ElementRef) {}
  @Input ('appScroll') elHeight: number;

  private status: boolean = ( document.documentElement.clientWidth < 922 &&  document.documentElement.clientHeight < 992);

  ngOnInit() {
    if (this.status){
      window.addEventListener('scroll', this.scroll, false);
      window.addEventListener('touchstart', this.touchS, false);
      window.addEventListener('touchmove', this.touch, false);
    }
  }

  ngOnDestroy() {
    if (this.status) {
      window.removeEventListener('scroll', this.scroll, false);
      window.removeEventListener('touchstart', this.touchS, false);
      window.removeEventListener('touchmove', this.touch, false);
    }
  }
  private scrollPosition: number = 0;
  private start: number;


  scroll = (): void => {
    this.scrollPosition = window.pageYOffset;
    if ( this.scrollPosition <=  this.elHeight ) this.open( 0, '.1s');

  };

  touchS = ($event): void => {
    this.start = $event.changedTouches[0].pageY;
  };

  touch = ($event): void => {
    let move;
    move = $event.changedTouches[0].pageY;
    if (this.status) {
      (this.scrollPosition <= this.elHeight + 5) ? this.open(0, '.2s') :
        (this.start > move) ?
          this.close(this.elHeight, '.25s') : this.open(0, '.2s');
    }
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
