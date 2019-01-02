import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-order',
  templateUrl: './to-order.component.html',
  styleUrls: ['./to-order.component.css']
})
export class ToOrderComponent implements OnInit {

  public isShow:boolean=false;
  constructor() { }

  ngOnInit() {
  }

}
