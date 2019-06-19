import {Directive, EventEmitter, Output} from '@angular/core';

@Directive({
  selector: '[appScrollRequest]'
})
export class ScrollRequestDirective {
  @Output() request: EventEmitter<any> = new EventEmitter<any>();
  innerH: number;
  status: boolean = true;

  constructor() {}
  ngOnInit() {
    window.addEventListener('scroll', this.scroll, false);
    window.addEventListener('resize', this.resize, false);
    this.innerH = Math.floor(window.innerHeight*1.8);
  }
  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, false);
    window.removeEventListener('resize', this.resize, false);
  }

  scroll = (): void => {
    if (window.pageYOffset + this.innerH > this.height() && this.status) this.load();
    else if (window.pageYOffset + this.innerH < this.height() && !this.status) this.status = !this.status;
  };
  load = (): void => {
    this.request.emit('');
    this.status = !this.status;
    console.log(true)
  };

  resize = ():void => {
    this.innerH = Math.floor(window.innerHeight*2.8);
  };

  height = (): number => {
    return Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
  }
}
