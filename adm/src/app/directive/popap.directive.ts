import {Directive, ElementRef, EventEmitter, Input, Output} from '@angular/core';

@Directive({
  selector: '[appPopap]'
})
export class PopapDirective {
  el: ElementRef;
  @Output() onClose = new EventEmitter();
  @Output() onCustomClose = new EventEmitter();
  @Input() closeComp;
  private defBlock;
  private node;
  constructor(el: ElementRef){
    this.el = el;
  }
  ngOnChanges(){
    if(this.closeComp){
      this.closeComp = null;
      this.CustomClose();
    }
  }
  ngAfterViewInit() {
    const hostElem = this.el.nativeElement;
    this.defBlock = hostElem;
    this.node = document.createElement("DIV");
    this.CustomClose();
    let node2 = document.createElement("DIV");
    this.node.classList.add('popup-directive');
    node2.classList.add('popup-directive-bg');
    this.node.appendChild(node2);
    this.node.appendChild(this.defBlock);
    document.getElementById('wrapper').appendChild(this.node);
    node2.onclick = ()=>{
      this.close();
    };
    let element = this.el.nativeElement.getElementsByClassName('ibox-tools');
    for(let i=0; i<element.length; i++){
      element[i].onclick = ()=>{
        this.close();
      };
    }
    let elf = this.el.nativeElement.getElementsByClassName ('form');
    for(let i=0; i<elf.length; i++){
      elf[i].onsubmit = ()=>{
        this.close();
      };
    }
  }
  close(){
    this.node.remove();
    this.onClose.emit(true);
  }
  CustomClose(){
    this.onCustomClose.emit(this.node);
  }
}
