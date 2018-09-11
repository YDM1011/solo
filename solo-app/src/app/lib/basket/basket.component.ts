import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  @Input() basket_value: number;
  constructor() { }

  ngOnInit() {
  }

}
