import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit, OnChanges {

  @Input() pic;
  @Input() size;
  public host= environment.host;
  public loaded = false;
  public isString = false;
  constructor() { }

  ngOnInit() {
    this.init()
  }

  ngOnChanges(){
    this.init()
  }

  init(){
    if (parseInt(this.size) > 0){this.isString=false}else{this.isString=true}
    if(this.pic.picCrop){
      if(this.pic.picCrop.search("/")>-1){
        let picCrop = this.pic.picCrop.split("/");
        this.pic.picCrop = this.encode(picCrop[picCrop.length-1]);
        this.loaded = true
      }else{
        this.pic.picCrop = this.encode(this.pic.picCrop);
        this.loaded = true
      }
    }
  }
  encode(str){
    return str.replace(/ /g, '%20');
  }
}
