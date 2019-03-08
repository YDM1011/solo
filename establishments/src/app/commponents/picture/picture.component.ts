import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {

  @Input() pic;
  @Input() size;
  public host= environment.host;
  public loaded = false;
  constructor() { }

  ngOnInit() {
    this.init()
  }

  ngOnChanges(){
    this.init()
  }

  init(){
    if(this.pic.picCrop){
      if(this.pic.picCrop.search("/")>-1){
        let picCrop = this.pic.picCrop.split("/");
        this.pic.picCrop = picCrop[picCrop.length-1];
        this.loaded = true
      }else{
        this.loaded = true
      }
    }
  }
}
