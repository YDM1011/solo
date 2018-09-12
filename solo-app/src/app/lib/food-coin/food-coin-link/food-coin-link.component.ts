import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-food-coin-link',
  templateUrl: './food-coin-link.component.html',
  styleUrls: ['./food-coin-link.component.css']
})
export class FoodCoinLinkComponent implements OnInit {

  @Input() coinValue: number;

  constructor() { }

  ngOnInit() {
  }

}
