import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-check-option',
  templateUrl: './check-option.component.html',
  styleUrls: ['./check-option.component.css']
})
export class CheckOptionComponent implements OnInit {
  @Input() option: any = [];
  @Input() menuId: any;
  @Output() onCheck: EventEmitter<any> = new EventEmitter<any>();

  public selected: any = [];
  constructor() { }

  ngOnInit() {
  }

  selectOption(opt) {
    const s = this;
    s.selected = [];
    opt.map(item => {
      if (item.check) {
        // delete item.check;
        s.selected.push(item);
      }
    });
    console.log(s.selected);
    s.onCheck.emit(s.selected);
  }
}
/**
  {
    label: string,
    check: boolean
  }
 **/
