import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appCreatePost]'
})
export class CreatePostDirective {

  constructor(private el: ElementRef) { }
  @Input('appCreatePost') activePost: any;

  @HostListener('click', ['$event']) onClick(event: Event): void {
    event.stopPropagation();
    this.active(this.activePost || event.target);
  }

  private active(status) {
    if (status.classList.contains('cr-open')) {
      this.el.nativeElement.classList.add('active');
      // document.documentElement.style.overflowY = 'hidden';
      // document.body.style.overflowY = 'hidden';
      window.scrollTo(0, this.getCoords());
      this.el.nativeElement.querySelector('textarea').focus();
    } else if (this.activePost){
      status.classList.remove('active');
      // document.documentElement.style.overflowY = '';
      // document.body.style.overflowY = '';
    }
  }
  private getCoords () {
    const num = (window.innerHeight > 500) ? 10 : 0;
    return this.el.nativeElement.getBoundingClientRect().top + pageYOffset - num;
  }
}
