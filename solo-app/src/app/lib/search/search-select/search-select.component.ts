import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

class SelectResult{
  imgUrl: string;
  name: string;
}


@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.css']
})
export class SearchSelectComponent implements OnInit {

  @Input() searchSelectTitle: string;
  @Input() searchSelectTitleImg: any;
  @Input() searchSelectResult: SelectResult;
  @Output() searchQuestion: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {
  }

}
