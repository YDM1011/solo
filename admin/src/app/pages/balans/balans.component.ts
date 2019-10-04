import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from '../../api.service';
import {orderBal, OrderBalans} from '../order/order-min';

@Component({
  selector: 'app-balans',
  templateUrl: './balans.component.html',
  styleUrls: ['./balans.component.css']
})
export class BalansComponent implements OnInit {

  public page = 1;
  public col = 10;
  public collectionSize: number;

  public orderStatus = '6';
  public id;
  public stActive;
  public list: OrderBalans[] = [];
  public foodCoin;
  public load = true;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    
    this.load = false;
    this.api.get('establishment', this.id, 'foodCoin').then((res: any) => {      
      if (res['foodCoin']) this.foodCoin = parseInt(res['foodCoin']);
    }).catch((err: any) => {});

    let s = this;
    s.api.get('balans',this.id).then((v:any)=>{
      s.collectionSize = v.length;
      console.log(v);
    });

    this.letPage();


    //this.api.get('balans', this.id).then((v: any) => {
    //  //console.log(v)
    //    this.load = true;
    //  if (v) {
    //    this.collectionSize = v.length;
//
    //    v.map(basket => {
    //      let client = basket.owneruser;
    //      let price = basket.totalPrice;
    //      let created = basket.data;
    //      let updated = basket.dataUpdate;
    //      let status = basket.status;
    //      let orderNumber = basket.orderNumber;
    //      let payment = basket.paymentType;
    //      let history = basket.foodCoinHistory;
    //      let type = basket.orderType;
    //      let id = basket._id;
    //      if (basket.orderType == 'delivery') price += basket.boxesPrice + basket.deliveryPrice;
    //      if (basket.orderType == 'bySelf') price += basket.boxesPrice;
    //      this.list.push(
    //        new orderBal(client, price, created, updated, status, id, orderNumber, payment, history, type)
    //      );
    //    });
    //  }
    //}).catch((err: any) => {});


  }

  letPage() {
    this.load = false;
    this.list = []; 
    this.api.justGet('basketsList', this.id, '', '?limit=' + this.col + '&skip=' + ((this.page-1)*this.col) + '&status=6').then((v: any) => {
      console.log(v)
        this.load = true;
      if (v) {
        v.map(basket => {
          let client = basket.owneruser;
          let price = basket.totalPrice;
          let created = basket.data;
          let updated = basket.dataUpdate;
          let status = basket.status;
          let orderNumber = basket.orderNumber;
          let payment = basket.paymentType;
          let history = basket.foodCoinHistory;
          let type = basket.orderType;
          let id = basket._id;
          if (basket.orderType == 'delivery') price += basket.boxesPrice + basket.deliveryPrice;
          if (basket.orderType == 'bySelf') price += basket.boxesPrice;
          this.list.push(
            new orderBal(client, price, created, updated, status, id, orderNumber, payment, history, type)
          );
        });
      }
    }).catch((err: any) => {});
  }

}
