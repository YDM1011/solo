import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appMobileMenu]'
})
export class MobileMenuDirective {
  @Input() menuClose: any;

  constructor (private el:ElementRef) {}
  private status: boolean = ( window.innerWidth < 992 &&  window.innerHeight < 550) || ( window.innerWidth < 500 &&  window.innerHeight < 992);

  ngOnInit() {
    if (this.status){
      window.addEventListener('resize', this.resize, false);
      document.body.addEventListener('touchstart', this.touchS, false);
      document.body.addEventListener('touchend', this.touchE, false);
    }
  }

  private start: number;
  private end: number;

  touchS = ($event): void => {
    $event.stopPropagation();
    this.start = $event.changedTouches[0].pageX;
  };
  touchE = ($event): void => {
    $event.stopPropagation();
    this.end = $event.changedTouches[0].pageX;
    if (window.innerWidth - 25 <= this.start && this.start - this.end >= 25) {
      this.el.nativeElement.style.right = '0';
      this.el.nativeElement.val = false;
    }
  };
  resize = (): void => {
    this.el.nativeElement.val = false;
    this.el.nativeElement.style.right = '-100%';
    if (window.innerWidth > 992) {
      this.el.nativeElement.style.transition = 'right 0s';
    } else {
      setTimeout(  () => {
        this.el.nativeElement.style.transition = 'right .2s ease-in-out';
      }, 0)
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
      if (this.end - this.start > 50) this.el.nativeElement.style.right = '-100%';
      this.el.nativeElement.val = false;
    }
  }
  @HostListener('click', ['$event']) onClick(event): void {
    this.close(event);
  }
  close(ev) {
    let tg = ev.target;
    if (this.el.nativeElement !== tg){
      while (tg != this.menuClose) {
        tg = tg.parentElement;
      }
      if (tg == this.menuClose) this.el.nativeElement.style.right = '-100%';
      this.el.nativeElement.val = false;
    }
  }
}
