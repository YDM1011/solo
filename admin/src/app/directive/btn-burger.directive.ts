import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appBtnBurger]'
})
export class BtnBurgerDirective {
  public el: ElementRef;
  public panel;
  public def;
  constructor(el: ElementRef) { this.el = el; }
  ngAfterViewInit() {
    const hostElem = this.el.nativeElement;
    this.panel = document.getElementById('navPanel');
    this.def = this.panel.style.display || "block";
    hostElem.onclick = ()=>{
      console.log(this.panel.style.display);
      if(this.panel.style.display != this.def){
        this.init()
      }else{
        this.unInit()
      }
    }
  }

  init(){
    this.panel.style.display = this.def || "block"
  }

  unInit(){
    this.panel.style.display = "none";
  }
}
// navPanel
