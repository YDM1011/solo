import {Directive, ElementRef, HostListener, OnDestroy} from '@angular/core';

@Directive({
  selector: '[appMobileMenu]'
})
export class MobileMenuDirective implements OnDestroy{

  start: number;
  end: number;

  constructor (private el:ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.open = false;
    this.el.nativeElement.openClose = this.open;

    window.addEventListener('orientationchange', this.resize, true);
    console.log(navigator.userAgent);
    if (( window.innerWidth < 992 &&  window.innerHeight < 550) || ( window.innerWidth < 500 &&  window.innerHeight < 992)){
      if ( !/iPhone/.test(navigator.userAgent) && ! /iPad/.test(navigator.userAgent)) {
        window.addEventListener('touchstart', this.touchS, false);
        window.addEventListener('touchend', this.touchE, false);
      }
    }
  }
  ngOnDestroy() {
    document.body.style.overflow = '';
  }


  touchS = ($event): void => {
    $event.stopPropagation();
    this.start = $event.changedTouches[0].pageX;
  };
  touchE = ($event): void => {
    $event.stopPropagation();
    this.end = $event.changedTouches[0].pageX;
    if (window.innerWidth - 25 <= this.start && this.start - this.end >= 25) this.el.nativeElement.openClose();
  };
  resize = (): void => {
    if (this.el.nativeElement.open) document.querySelector('body').style.overflow = '';
    this.el.nativeElement.open = false;
    // if (window.innerWidth > 992) {
    //   this.el.nativeElement.style.transition = 'right 0s';
    // } else {
    //   setTimeout(  () => this.el.nativeElement.style.transition = 'right .2s ease-in-out', 0)
    // }
  };

  open = () => {
    this.el.nativeElement.open = !this.el.nativeElement.open;
    document.querySelector('body').style.overflow = (this.el.nativeElement.open) ?  'hidden' : '';
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
      if (this.end - this.start > 50) this.el.nativeElement.openClose();
    }
  }
  @HostListener('click', ['$event']) onClick(event): void {
    let tg = event.target;
    while(tg != this.el.nativeElement) {
      if (tg.classList.contains('closeMob')){
        this.el.nativeElement.openClose();
        return
      }
      tg = tg.parentElement;
    }
  }
}
