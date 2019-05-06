import { Component, OnInit } from '@angular/core';
import {FullOrder, OrderMax} from "./order";
import {ApiService} from "../../api.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  public order:OrderMax;
  public estId;
  public id;
  public apiDomain = environment.apiDomain;
  public allInThis;
  public allInAny;

  public comment;
  public totalPrice;
  public boxesPrice;
  public deliveryPrice;

  public isCanEdit:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit() {

    this.Init()
  }
  Init(){
    this.estId = this.route.snapshot.paramMap.get('eid');
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.justGet(`basketsList/${this.estId}?_id=${this.id}`).then(obj=>{
      this.order = new FullOrder(obj);
      this.isCanEdit = this.order.status == "1";
      this.api.justGet(`basketsList/count?query={"owneruser":"${this.order.client._id}","ownerest":"${this.estId}"}`).then((v:any)=>{
        this.allInThis = v.count
      });
      this.api.justGet(`basketsList/count?query={"owneruser":"${this.order.client._id}"}`).then((v:any)=>{
        this.allInAny = v.count
      })
    });

  }

  confirmOrder(){
    this.api.set('basketsList', {status: '2'},this.estId,'', '?id='+this.order.id).then(v=>{
      if(v){
        this.order.status = '2';
      }
    });
  }
  doneOrder(){
    this.api.set('basketsList', {status: '6'},this.estId,'', '?id='+this.order.id).then(v=>{
      if(v){
        this.order.status = '6';
      }
    });
  }
  deletOrder(){
    this.api.set('basketsList', {status: '7'},this.estId,'', '?id='+this.order.id).then(v=>{
      if(v){
        this.order.status = '7';
      }
    });
  }
  whaitOrder(){
    this.api.set('basketsList', {status: '3'},this.estId,'', '?id='+this.order.id).then(v=>{
      if(v){
        this.order.status = '3';
      }
    });
  }
  changeOrder(){
    console.log(this.order);
    let comment = this.comment ? {entity:'admin',text:this.comment} : null;
    let obj = {
      status: '5'
    };
    if (comment){
      this.order.orderCommentData.push(comment);
      obj['orderCommentData'] = this.order.orderCommentData;
    }
    if (this.totalPrice) obj['totalPrice'] = this.totalPrice || this.order.productPrice;
    if (this.boxesPrice) obj['boxesPrice'] = this.boxesPrice || this.order.boxPrice;
    if (this.deliveryPrice) obj['deliveryPrice'] = this.deliveryPrice || this.order.deliveryPrice;
    console.log(obj);

    this.api.set('basketsList', obj,this.estId,'', '?id='+this.order.id).then(v=>{
      if(v){
        this.order.status = '5';
      }
    });
  }
}
