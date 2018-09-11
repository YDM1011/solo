import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-food-coin',
  templateUrl: './food-coin.component.html',
  styleUrls: ['./food-coin.component.css']
})
export class FoodCoinComponent implements OnInit {

  @Input() coin_value: number;

  constructor() { }

  ngOnInit() {

  }

}
