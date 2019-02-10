import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public host: string = environment.apiDomain.split('//')[1];

  @Output() onFind: EventEmitter<any> = new EventEmitter<any>();
  @Input() array: any;
  @Input() arrayEts: any;
  @Input() type: any;
  constructor() { }
  public searchText = '';
  ngOnInit() {
    console.log(this.arrayEts)
  }

}
