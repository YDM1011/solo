import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  public isShow:boolean = false;
  public menus:any;
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    let s = this;
    // s.initApi();
  }
  ngOnDestroy() {
    document.body.style.overflow = '';
    document.querySelector('nav').style.zIndex = '';
  }
  initApi(){
    let s = this;
    s.api.get('est_menu').then((val:any)=>{
      console.log(val)
    })
  }
  hidden() {
    this.isShow = !this.isShow;
    document.querySelector("nav").style.zIndex = (this.isShow) ? '9': '';
    document.querySelector('body').style.overflow = (this.isShow) ?  'hidden' : '';
  }
}
