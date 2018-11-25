import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @Input() option:any = [];
  @Input() defoult:string = '';
  @Output() onCheck: EventEmitter<any> = new EventEmitter<any>();
  public isActive:boolean=false;
  public slected:any;
  constructor() { }

  ngOnInit() {
  }

  selectOption(opt){
    let s = this;
    s.isActive = false;
    s.defoult = opt.label;
    s.onCheck.emit(opt);
  }
}
