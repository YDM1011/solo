import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foodcoin',
  templateUrl: './foodcoin.component.html',
  styleUrls: ['./foodcoin.component.css']
})
export class FoodcoinComponent implements OnInit {

  public tab = 1;
  constructor() { }

  ngOnInit() {
  }

}
