import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-basket-link',
  templateUrl: './basket-link.component.html',
  styleUrls: ['./basket-link.component.css']
})
export class BasketLinkComponent implements OnInit {

  @Input() basketValue: number;

  constructor() { }

  ngOnInit() {
  }

}
