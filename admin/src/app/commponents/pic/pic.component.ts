import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-pic',
  templateUrl: './pic.component.html',
  styleUrls: ['./pic.component.css']
})
export class PicComponent implements OnInit {

  @Input() pic:any;
  constructor() { }

  ngOnInit() {
  }

}
