import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {environment} from "../../../environments/environment";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-bar-menu',
  templateUrl: './bar-menu.component.html',
  styleUrls: ['./bar-menu.component.css'],
  animations: [
    trigger('inOpacity', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('140ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ]),
    trigger('inPop', [
      transition(':enter', [
        style({
          transform: 'scaleX(0.8) scaleY(0.8)',
          opacity: 0
        }),
        animate('220ms', style({
          transform: 'scaleX(1) scaleY(1)',
          opacity: 1
        }))
      ]),
      transition(':leave', [
        animate('120ms', style({
          transform: 'scaleX(0.8) scaleY(0.8)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class BarMenuComponent implements OnInit {
  public popPreProd: boolean = false;
  public domain: string = environment.apiDomain;
  public host: string = environment.apiDomain.split('//')[1];
  public isAuth:boolean=false;
  public showPop:boolean=false;
  public popTerms: boolean = false;
  public popConfid: boolean = false;
  public userId;

  constructor(private coockie:CookieService) { }

  ngOnInit() {
    this.userId = this.coockie.get('userid');
    if (this.userId){
      this.isAuth = true;
    }else{
      this.isAuth = false;
    }
  }
  ngOnDestroy() {
    document.body.style.overflow = '';
  }
  hidden(status) {
    window.scroll(0, 0);
    document.querySelector('body').style.overflow = (status) ? 'hidden' : '';
    document.querySelector('nav').style.zIndex = (status) ? '1' : '10';
  }

  checkAuth(e){
    if (!this.isAuth){
      e.preventDefault();
      this.showPop = true
    }
  }
  hide(){
    this.showPop = false;
  }
}
