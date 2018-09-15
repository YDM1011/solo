import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

class SearchSelect{
  title: string;
  url: string;
  name: string;
}

@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.css']
})
export class SearchSelectComponent implements OnInit {

  @Input() searchSelectTitle: string;
  @Input() searchSelect: SearchSelect;
  @Output() searchQuestion: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
