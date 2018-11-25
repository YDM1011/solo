import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public ests:any = [];
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {

    this.getEstablishment();
  }
  getEstablishment(){
    let select = "subdomain,_id";
    let self = this;
    this.api.getEsts(select).then((res:any)=>{
      self.ests = res;
    })

  }
}
