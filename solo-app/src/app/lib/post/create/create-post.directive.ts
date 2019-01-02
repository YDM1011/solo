import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appCreatePost]'
})
export class CreatePostDirective {

  constructor(private el: ElementRef) { }
  @Input('appCreatePost') activePost: any;

  @HostListener('click', ['$event']) onClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.active(this.activePost || false);
  }

  private active(status) {
    if (!status) {
      console.log('active');
      this.el.nativeElement.classList.add('active');
      document.documentElement.style.overflowY = 'hidden';
      document.body.style.overflowY = 'hidden';
      window.scrollTo(0, this.getCoords());
      this.el.nativeElement.querySelector('textarea').focus();
    } else {
      status.classList.remove('active');
      document.documentElement.style.overflowY = 'auto';
      document.body.style.overflowY = 'auto';
    }
  }
  private getCoords () {
    const num = (window.innerHeight > 500) ? 10 : 0;
    return this.el.nativeElement.getBoundingClientRect().top + pageYOffset - num;
  }
}
