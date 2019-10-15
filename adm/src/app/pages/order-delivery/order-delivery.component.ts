import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../api.service';
import {order, OrderMin} from '../order/order-min';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-order-delivery',
  templateUrl: './order-delivery.component.html',
  styleUrls: ['./order-delivery.component.css']
})
export class OrderDeliveryComponent implements OnInit {

  public page = 1;
  public col = 10;
  public collectionSize: number;

  public orderType = 'delivery';
  public apiDomain = environment.apiDomain;
  public stActive;
  public list: OrderMin[] = [];
  public load = true;
  
  @Input() id;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {    
    this.orderType = this.route.snapshot.paramMap.get('ordType');    
    this.load = false;
    this.route.params.subscribe((params: any) => {

      if (this.orderType != params.ordType) {        
        this.orderType = params.ordType;
        //this.getStartList();
        let s = this;
        s.api.justGet('basketsList','','', '?orderType=' + this.orderType).then((v:any)=>{
          s.collectionSize = v.length;      
        });
        this.letPage();    
      }
    });
    //this.getStartList();
    let s = this;
    s.api.justGet('basketsList','','', '?orderType=' + this.orderType).then((v:any)=>{
      s.collectionSize = v.length;      
    });
    this.letPage();    
  }

  getStartList() {
    this.load = false;
    this.api.justGet('basketsList', '', '', '?skip=0&orderType=' + this.orderType)
    //this.api.get('basketsList/'+ this.orderType, '', '', '')
      .then((v: any) => {
        this.load = true;
        if (v) {
          if (v.length > 0) {
            this.list = [];
            v.map(basket => {
              let client = basket.owneruser;
              let adress = '';
              if (basket.orderType == 'delivery') adress = basket.addressData
              else adress = basket.estAddressData;
              let prods = basket.productData;
              let price = basket.totalPrice;
              let productPrice = basket.totalPrice;
              let created = basket.data;
              let updated = basket.dataUpdate;
              let time = basket.deliveryTime;
              let status = basket.status;
              let orderNumber = basket.orderNumber;
              let paymentType = basket.paymentType;
              let orderType = basket.orderType;
              let mobile = basket.anyMobile;
              let box = basket.boxesPrice;
              let delivery = basket.deliveryPrice;              
              let est = basket.ownerest;
              let id = basket._id;
              if (basket.orderType == 'delivery') price += basket.boxesPrice + basket.deliveryPrice;
              if (basket.orderType == 'bySelf') price += basket.boxesPrice;
              this.list.push(
                new order(client, prods, price, created, updated, status, id, orderNumber, time, adress, paymentType, mobile, box, delivery, productPrice, orderType, est)
              );
            });
          }
        }
      });
      
    if (location.href.indexOf("/orders") != -1) {
      setTimeout(() => {
        this.getStartList();
      }, 60*1000);
    }
  }

  letPage() {
    this.load = false;
    this.api.justGet('basketsList', '', '', '?limit=' + this.col + '&skip=' + ((this.page-1)*this.col) + '&orderType=' + this.orderType)
    //this.api.get('basketsList/'+ this.orderType, '', '', '')
      .then((v: any) => {
        this.load = true;
        if (v) {
          if (v.length > 0) {
            this.list = [];
            v.map(basket => {
              let client = basket.owneruser;
              let adress = '';
              if (basket.orderType == 'delivery') adress = basket.addressData
              else adress = basket.estAddressData;
              let prods = basket.productData;
              let price = basket.totalPrice;
              let productPrice = basket.totalPrice;
              let created = basket.data;
              let updated = basket.dataUpdate;
              let time = basket.deliveryTime;
              let status = basket.status;
              let orderNumber = basket.orderNumber;
              let paymentType = basket.paymentType;
              let orderType = basket.orderType;
              let mobile = basket.anyMobile;
              let box = basket.boxesPrice;
              let delivery = basket.deliveryPrice;              
              let est = basket.ownerest;
              let id = basket._id;
              if (basket.orderType == 'delivery') price += basket.boxesPrice + basket.deliveryPrice;
              if (basket.orderType == 'bySelf') price += basket.boxesPrice;
              this.list.push(
                new order(client, prods, price, created, updated, status, id, orderNumber, time, adress, paymentType, mobile, box, delivery, productPrice, orderType, est)
              );
            });
          }
        }
      });

  }

  getByStatus(st) {
    this.stActive = st;
    this.list = [];
    if (st == '0') 
      this.api.justGet('basketsList', '', '', '?status=' + st + '&skip=0')
      .then((v: any) => {
      
        this.load = true;
        if (v) {
          v.map(basket => {
            let client = basket.owneruser;
            let adress = basket.addressData;
            let prods = basket.productData;
            let price = basket.totalPrice;
            let productPrice = basket.totalPrice;
            let created = basket.data;
            let updated = basket.dataUpdate;
            let time = basket.deliveryTime;
            let status = basket.status;
            let orderNumber = basket.orderNumber;
            let paymentType = basket.paymentType;
            let orderType = basket.orderType;
            let mobile = basket.anyMobile;
            let box = basket.boxesPrice;
            let delivery = basket.deliveryPrice;           
            let est = basket.ownerest;
            let id = basket._id;
            if (basket.orderType == 'delivery') price += basket.boxesPrice + basket.deliveryPrice;
            if (basket.orderType == 'bySelf') price += basket.boxesPrice;
            this.list.push(
              new order(client, prods, price, created, updated, status, id, orderNumber, time, adress, paymentType, mobile, box, delivery, productPrice, orderType, est)
            );
          });
        }
      });
    else
      this.api.justGet('basketsList', '', '', '?status=' + st + '&skip=0&orderType=' + this.orderType)
      .then((v: any) => {
        
        this.load = true;
        if (v) {
          v.map(basket => {
            let client = basket.owneruser;
            let adress = basket.addressData;
            let prods = basket.productData;
            let price = basket.totalPrice;
            let productPrice = basket.totalPrice;
            let created = basket.data;
            let updated = basket.dataUpdate;
            let time = basket.deliveryTime;
            let status = basket.status;
            let orderNumber = basket.orderNumber;
            let paymentType = basket.paymentType;
            let orderType = basket.orderType;
            let mobile = basket.anyMobile;
            let box = basket.boxesPrice;
            let delivery = basket.deliveryPrice;           
            let est = basket.ownerest;
            let id = basket._id;
            if (basket.orderType == 'delivery') price += basket.boxesPrice + basket.deliveryPrice;
            if (basket.orderType == 'bySelf') price += basket.boxesPrice;
            this.list.push(
              new order(client, prods, price, created, updated, status, id, orderNumber, time, adress, paymentType, mobile, box, delivery, productPrice, orderType, est)
            );
          });
        }
      });

  }

}
