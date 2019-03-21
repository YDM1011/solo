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
  constructor( private api: ApiService) { }

  ngOnInit() {
    this.api.onEstId.subscribe(v=>{
      if(v)
      this.estId = v;
      // alert(v)
    })
  }
}
