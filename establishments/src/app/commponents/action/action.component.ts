import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  public actions;
  public estId;
  public sort;
  constructor( private api: ApiService) { }

  ngOnInit() {
    this.sort = JSON.stringify({data: -1});
    this.api.onEstId.subscribe(v => {
      this.estId = v;
    });
  }

}
