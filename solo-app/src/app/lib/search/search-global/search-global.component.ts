import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

class Search{
  url: string;
  name: string;
}

@Component({
  selector: 'app-search-global',
  templateUrl: './search-global.component.html',
  styleUrls: ['./search-global.component.css']
})
export class SearchGlobalComponent implements OnInit {

  @Input() searchResult: Search;
  @Output() searchQuestion: EventEmitter<any> = new EventEmitter<any>();
  @Output() searchUrl: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
