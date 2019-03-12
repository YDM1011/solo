import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';

@Component({
  selector: 'app-check-option',
  templateUrl: './check-option.component.html',
  styleUrls: ['./check-option.component.css']
})
export class CheckOptionComponent implements OnInit, OnChanges {
  @Input() option: any = [];
  @Input() menuId: any;
  @Output() onCheck: EventEmitter<any> = new EventEmitter<any>();

  public selected: any = [];

  @Input() type: any;
  public categories: any = [];
  public catNames: any = [];
  constructor() { }

  ngOnInit() {
    this.parseToCat()
  }
  ngOnChanges(){this.parseToCat()}

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

  parseToCat(){
    let s = this;
    s.categories = [];
    s.option.map(d=>{
      console.log(d);
      if(d.category){
        if (s.categories[d.category.name]){
          s.categories[d.category.name].push(d)
        }else{
          s.categories[d.category.name] = [];
          s.categories[d.category.name].push(d)
        }
      }else{
        let keyNoCat = "Без категорії";
        if (s.categories[keyNoCat]){
          s.categories[keyNoCat].push(d)
        }else{
          s.categories[keyNoCat] = [];
          s.categories[keyNoCat].push(d)
        }
      }
    });
    s.catNames = Object.keys(s.categories);
    console.log(s.categories)
  }
}
/**
  {
    label: string,
    check: boolean
  }
 **/
