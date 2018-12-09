import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  public basket: any;

  constructor() { }

  ngOnInit() {
  }

  result(data) {
    let s = this;
    s.basket = data;
    console.log(data);

  }
}
