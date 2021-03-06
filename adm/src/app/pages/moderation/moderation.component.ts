import {Component, OnChanges, OnInit} from '@angular/core';
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-moderation',
  templateUrl: './moderation.component.html',
  styleUrls: ['./moderation.component.css']
})
export class ModerationComponent implements OnInit,OnChanges {

  public estId;
  public ests = [];
  public foodCoin;
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.initApi()
  }

  ngOnChanges(){}

  initApi(){
    let s = this;
    let select = `?populate={"path":"permisions","select":"firstName lastName"}&select=subdomain,name,verify,isOnline,_id,permisions,isCart`;
    s.api.apiGet('establishment','',select).then((v:any)=>{
      s.ests = v;
    })
    s.api.apiGet('estBalanse','','').then((v:any)=>{
      s.foodCoin = v[0];
    })
  }

  reinit(e){
    let s = this;
    s.ests.map((it, i) => {
      if(it._id == e._id){
        s.ests[i] = e;
      }
    })
  }

  updateStatus(est){
    let s = this;
    est.verify = !est.verify;
    s.api.apiPost('establishment',est).then((v:any)=>{  })
  }
  updateOnline(est){
    let s = this;
    est.isOnline = !est.isOnline;
    s.api.apiPost('establishment',est).then((v:any)=>{  })
  }
  updateCart(est){
    let s = this;
    est.isCart = !est.isCart;
    s.api.apiPost('establishment',est).then((v:any)=>{  })
  }

}
