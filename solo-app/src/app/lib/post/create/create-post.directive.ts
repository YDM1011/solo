import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appCreatePost]'
})
export class CreatePostDirective {

  constructor(private el: ElementRef) { }
  @Input() activePost: any;

  @HostListener('click', ['$event']) onClick(): void {
    this.active(this.activePost || false);
  }

  private active(status) {
    event.stopPropagation();
    if(!status){
      this.el.nativeElement.classList.add('active');
      document.documentElement.style.overflowY = 'hidden';
      document.body.style.overflowY = 'hidden';
      this.el.nativeElement.scrollIntoView({block: 'start', behavior: 'smooth'});
      // window.scrollTo(0, this.el.nativeElement.getBoundingClientRect().y + window.pageYOffset - 15)
    }
    else{
      status.classList.remove('active');
      document.documentElement.style.overflowY = 'auto';
      document.body.style.overflowY = 'auto';
    }

  }

}
