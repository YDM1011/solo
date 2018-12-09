import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  public basket: any;
  public totalPrice: any = 0;

  constructor() { }

  ngOnInit() {
  }

  result(data) {
    let s = this;
    s.basket = data;
    s.basket.products.map(product => {
      s.totalPrice += parseInt(product.portionCheck.price);
    });
    console.log(data);

  }
}
