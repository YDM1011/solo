import {Component, OnInit, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit, OnChanges {

  @Input() imgObj:any={};

  constructor() { }

  ngOnChanges() {
    console.log(this.imgObj)
  }
  ngOnInit() {
  }

}
