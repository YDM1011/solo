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
      window.addEventListener('touchmove', this.touch, false);
      this.elHeight = this.el.nativeElement.offsetHeight;
    }
  }

  ngOnDestroy() {
    if (this.status) {
      window.removeEventListener('scroll', this.scroll, false);
      window.removeEventListener('touchstart', this.touchS, false);
      window.removeEventListener('touchmove', this.touch, false);
    }
  }

  private start: number;
  private elHeight: number = 0;


  scroll = (): void => {
    if (  window.pageYOffset <=  this.elHeight ) this.open( 0, '.1s');
  };

  touchS = ($event): void => {
    this.start = $event.changedTouches[0].pageY;
  };

  touch = ($event): void => {
    let move = $event.changedTouches[0].pageY;
    ( window.pageYOffset <= this.elHeight + 5) ? this.open(0, '.2s') :
      (this.start > move) ?
        this.close(this.elHeight, '.25s') : this.open(0, '.2s');
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
