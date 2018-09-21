import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() onFind: EventEmitter<any> = new EventEmitter<any>();
  @Input() array: any;
  constructor() { }
  public searchText = '';
  ngOnInit() {
  }

}