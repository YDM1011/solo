import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-bar-menu',
  templateUrl: './bar-menu.component.html',
  styleUrls: ['./bar-menu.component.css']
})
export class BarMenuComponent implements OnInit {
  public domain: string = environment.apiDomain;
  public host: string = environment.apiDomain.split('//')[1];
  constructor() { }

  ngOnInit() {
  }
  popTerms: boolean = false;
  popConfid: boolean = false;
  hidden(status) {
    document.querySelector('body').style.overflow = (status) ? 'hidden' : '';
  }
}
