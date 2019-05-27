import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-action-page',
  templateUrl: './action-page.component.html',
  styleUrls: ['./action-page.component.css']
})
export class ActionPageComponent implements OnInit {

  public actions;
  public estId;
  public sort;
  constructor( private api: ApiService) { }

  ngOnInit() {
    this.sort = JSON.stringify({data: -1});
    this.api.onEstId.subscribe(v => {
      if (v)
      this.estId = v;
      // alert(v)
    });
  }
}
