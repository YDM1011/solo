import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-create-establishment',
  templateUrl: './create-establishment.component.html',
  styleUrls: ['./create-establishment.component.css'],
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
export class CreateEstablishmentComponent implements OnInit {
  public showPop:boolean = false;
  public isAuth:boolean = false;
  public domain = environment.apiDomain;

  constructor(private coockie:CookieService) { }

  ngOnInit() {
    if (this.coockie.get('userid')){
      this.isAuth = true;
    }else{
      this.isAuth = false;
    }
  }

  hidden(){
    window.scroll(0, 0);
    this.showPop = !this.showPop;
    document.querySelector('body').style.overflow = this.showPop ? 'hidden' : '';
    document.querySelector('nav').style.zIndex = this.showPop ? '1' : '10';
  }
}
