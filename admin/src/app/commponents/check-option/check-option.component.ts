import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-check-option',
  templateUrl: './check-option.component.html',
  styleUrls: ['./check-option.component.css']
})
export class CheckOptionComponent implements OnInit {
  @Input() option:any = [];
  @Output() onCheck: EventEmitter<any> = new EventEmitter<any>();
  public slected:any = [];
  constructor() { }

  ngOnInit() {
  }

  selectOption(opt){
    let s = this;
    s.slected = [];
    opt.map(item=>{
      if(item.check){
        // delete item.check;
        s.slected.push(item)
      }
    });
    s.onCheck.emit(s.slected);
  }
}
