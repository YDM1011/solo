import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {animate, style, transition, trigger} from "@angular/animations";
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
  public domain: string = environment.apiDomain;
  public host: string = environment.apiDomain.split('//')[1];
  public popPreProd = false;

  constructor(
    public cookie: CookieService
  ) { }

  ngOnInit() {

  }
  ngOnDestroy() {
    document.body.style.overflow = '';
  }
  popTerms: boolean = false;
  popConfid: boolean = false;
  hidden(status) {
    window.scroll(0, 0);
    document.querySelector('body').style.overflow = (status) ? 'hidden' : '';
    document.querySelector('nav').style.zIndex = (status) ? '1' : '10';
  }
}
