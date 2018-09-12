import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tape-link',
  templateUrl: './tape-link.component.html',
  styleUrls: ['./tape-link.component.css']
})
export class TapeLinkComponent implements OnInit {

  @Input() tapeName: string;

  constructor() { }

  ngOnInit() {
  }

}
