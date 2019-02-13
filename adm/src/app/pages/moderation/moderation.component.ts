import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-moderation',
  templateUrl: './moderation.component.html',
  styleUrls: ['./moderation.component.css']
})
export class ModerationComponent implements OnInit {

  public ests = [];
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.initApi()
  }

  initApi(){
    let s = this;
    let select = `?select=subdomain,name,verify`;
    s.api.apiGet('establishment','',select).then((v:any)=>{
      s.ests = v;
    })
  }

  updateStatus(est){
    let s = this;
    est.verify = !est.verify;
    s.api.apiPost('establishment',est).then((v:any)=>{ })
  }

}
