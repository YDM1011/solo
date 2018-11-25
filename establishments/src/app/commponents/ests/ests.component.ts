import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-ests',
  templateUrl: './ests.component.html',
  styleUrls: ['./ests.component.css']
})
export class EstsComponent implements OnInit {

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    let s = this;
    // s.initApi();
  }

  initApi(){
    let s = this;
    s.api.get('est_menu').then((val:any)=>{
      console.log(val)
    })
  }
}
