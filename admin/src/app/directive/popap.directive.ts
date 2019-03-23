import {Directive, ElementRef, EventEmitter, Input, Output} from '@angular/core';

@Directive({
  selector: '[appPopap]'
})
export class PopapDirective {
  el: ElementRef;
  @Output() onClose = new EventEmitter();
  @Input('appPopap') custom;
  private defBlock;
  private node;
  constructor(el: ElementRef){
    this.el = el;
  }

  ngAfterViewInit() {
    const hostElem = this.el.nativeElement;
    this.defBlock = hostElem;
    this.node = document.createElement("DIV");
    let node2 = document.createElement("DIV");
    this.node.classList.add('popup-directive');
    node2.classList.add('popup-directive-bg');
    let node3 = this.el.nativeElement.getElementsByClassName('cansel-popup-btn')[0];
    this.node.appendChild(node2);
    this.node.appendChild(this.defBlock);
    document.getElementById('wrapper').appendChild(this.node);
    node2.onclick = ()=>{
      this.close();
    };
    try {
      node3.onclick = ()=>{
        this.close();
      };
    }catch (e) {}

    let element = this.el.nativeElement.getElementsByClassName('ibox-tools');
    console.log(element);
    for(let i=0; i<element.length; i++){

      element[i].onclick = ()=>{
        console.log("ok");
        this.close();
      };
    }
    let element2 = this.el.nativeElement.getElementsByClassName('form');
    console.log(element);
    for(let i=0; i<element2.length; i++){

      element2[i].onsubmit = ()=>{
        console.log("ok");
        this.close();
      };
    }
  }
  close(){
    this.node.remove();
    this.onClose.emit(true);
  }
}
