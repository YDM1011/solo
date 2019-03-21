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
  constructor( private api: ApiService) { }

  ngOnInit() {
    this.api.onEstId.subscribe(v=>{
      this.estId = v;
    })
  }

}
