import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tape',
  templateUrl: './tape.component.html',
  styleUrls: ['./tape.component.css']
})
export class TapeComponent implements OnInit {

  @Input() tape_name: string;

  constructor() { }

  ngOnInit() {
  }

}
