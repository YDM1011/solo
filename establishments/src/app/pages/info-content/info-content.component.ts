import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-content',
  templateUrl: './info-content.component.html',
  styleUrls: ['./info-content.component.css']
})
export class InfoContentComponent implements OnInit {
  initS: boolean = false;
  public myests:any;
  constructor() { }

  ngOnInit() {

  }
  // ngAfterViewInit() {
  //   console.log(true);
  //   setTimeout( this.initS = true, 0);
  //   // this.initS = true;
  // }
}
