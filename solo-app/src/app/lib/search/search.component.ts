import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

class Search{
  url: string;
  name: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  @Input() searchResult: Search;
  @Output() searchQuestion: EventEmitter<any> = new EventEmitter<any>();
  @Output() searchUrl: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
