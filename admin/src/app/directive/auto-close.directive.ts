import {Directive, ElementRef} from '@angular/core';
import {DeviceDetectorService} from "ngx-device-detector";
@Directive({
  selector: '[appAutoClose]'
})
export class AutoCloseDirective {
  public el: ElementRef;
  public panel;
  public def;
  constructor(private deviceService: DeviceDetectorService, el: ElementRef) { this.el = el; }
  ngAfterViewInit() {
    const hostElem = this.el.nativeElement;
    this.panel = document.getElementById('navPanel');
    this.def = this.panel.style.display || "block";
    hostElem.onclick = ()=>{
      if (this.deviceService.isMobile()){
        this.unInit()
      }
    }
  }

  unInit(){
    this.panel.style.display = "none";
  }
}
