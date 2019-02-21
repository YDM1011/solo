import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appScrollTo]'
})
export class ScrollToDirective {

  padding: number;
  targetId: string = 'contTape';

  constructor() {}
  ngOnInit() {
    this.padding = this.check();
    window.addEventListener('orientationchange', () => this.padding = this.check(), false);
  }

  check = (): number => {
    return (window.innerWidth < 500 || window.innerHeight < 500 ) ? 5 : document.querySelector('nav').clientHeight + 10;
  };
  @HostListener('click', ['$event']) onClick(): void {
    let speed = .8,
      y = window.pageYOffset,
      t = document.getElementById(this.targetId).getBoundingClientRect().top - this.padding,
      start = null;

    requestAnimationFrame(step);
    function step(time) {
      if (start === null) start = time;
      let progress = time - start,
        sY = (t < 0 ? Math.max(y - progress/speed, y + t) : Math.min(y + progress/speed, y + t));
      window.scrollTo(0, sY);
      if (sY != y + t) {
        requestAnimationFrame(step)
      }
    }
  }
}
