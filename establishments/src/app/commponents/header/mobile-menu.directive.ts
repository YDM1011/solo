import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appMobileMenu]'
})
export class MobileMenuDirective {

  constructor (private el:ElementRef) {}

  ngOnInit() {
    if (( window.innerWidth < 992 &&  window.innerHeight < 550) || ( window.innerWidth < 500 &&  window.innerHeight < 992)){
      window.addEventListener('resize', this.resize, false);
      document.body.addEventListener('touchstart', this.touchS, false);
      document.body.addEventListener('touchend', this.touchE, false);
    }
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
  }

  start: number;
  end: number;

  touchS = ($event): void => {
    $event.stopPropagation();
    this.start = $event.changedTouches[0].pageX;
  };
  touchE = ($event): void => {
    $event.stopPropagation();
    this.end = $event.changedTouches[0].pageX;
    if (window.innerWidth - 25 <= this.start && this.start - this.end >= 25) {
      this.el.nativeElement.open = true;
      document.body.style.overflow = 'hidden';
    }
  };
  resize = (): void => {
    this.el.nativeElement.open = false;
    document.body.style.overflow = '';
    if (window.innerWidth > 992) {
      this.el.nativeElement.style.transition = 'right 0s';
    } else {
      setTimeout(  () => this.el.nativeElement.style.transition = 'right .2s ease-in-out', 0)
    }
  };

  @HostListener('touchstart', ['$event']) onStart(event): void {
    if(event.touches){
      event.stopPropagation();
      this.start = event.changedTouches[0].pageX;
    }
  }
  @HostListener('touchend', ['$event']) onEnd(event): void {
    if(event.touches){
      event.stopPropagation();
      this.end = event.changedTouches[0].pageX;
      if (this.end - this.start > 50) {
        document.body.style.overflow = 'hidden';
        this.el.nativeElement.open = false;
      }
    }
  }
}
