import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appAcardion]'
})
export class AcardionDirective {
  el: ElementRef;
  private btA;
  private bt;
  private bc;
  private triger;
  private defBlock;
  constructor(el: ElementRef){
    this.el = el;
  }

  ngAfterViewInit() {
    const hostElem = this.el.nativeElement;
    this.btA = this.el.nativeElement.getElementsByClassName('close-acardion');
    this.bt = hostElem.children[0];
    this.bc = hostElem.children[1];
    this.init();
    this.bt.onclick = ()=>{
      if(this.triger){
        this.init()
      }else{
        this.unInit()
      }
    };
    try {
      this.btA[0].onclick = ()=>{
        if(this.triger){
          this.init()
        }else{
          this.unInit()
        }
      }
    }catch (err) {
      
    }
  }
  init(){
    let s = this;
    s.defBlock = s.bc.style.display;
    this.triger=false;
    s.bc.style.display = 'none';
    if (this.el.nativeElement.getElementsByClassName('fa-chevron-up')[0]){
      this.el.nativeElement.getElementsByClassName('fa-chevron-up')[0].style.transform = "rotate(0deg)"
    }

  }
  unInit(){
    let s = this;
    this.triger=true;
    s.bc.style.display = s.defBlock;
    if (this.el.nativeElement.getElementsByClassName('fa-chevron-up')[0]){
      this.el.nativeElement.getElementsByClassName('fa-chevron-up')[0].style.transform = "rotate(180deg)";
    }
  }
}
