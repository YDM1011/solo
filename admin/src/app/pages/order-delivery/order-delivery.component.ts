import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../api.service';
import {order, OrderMin} from '../order/order-min';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-order-delivery',
  templateUrl: './order-delivery.component.html',
  styleUrls: ['./order-delivery.component.css']
})
export class OrderDeliveryComponent implements OnInit, OnChanges {

  public page = 1;
  public col = 10;
  public collectionSize: number;

  public orderType = 'delivery';
  public apiDomain = environment.apiDomain;
  public id;
  public stActive;
  public list: OrderMin[] = [];
  public load = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.orderType = this.route.snapshot.paramMap.get('ordType');
    
    this.load = false;
    this.route.params.subscribe((params: any) => {

      if (this.id != params.id || this.orderType != params.ordType) {
        this.id = params.id;
        this.orderType = params.ordType;
        //this.getStartList(params.id);
        let s = this;
        s.api.justGet('basketsList',this.id,'', '?orderType=' + this.orderType).then((v:any)=>{
          s.collectionSize = v.length;      
        });
        this.letPage(); 
      }
    });
    //this.getStartList(this.id);
    let s = this;
    s.api.justGet('basketsList',this.id,'', '?orderType=' + this.orderType).then((v:any)=>{
      s.collectionSize = v.length;      
    });
    this.letPage();
  }

  ngOnChanges() {
    // this.route.params.subscribe((params:any) => {
    //   console.log(params);
    //   if(this.id != params.id && this.orderType != params.ordType){
    //     this.id = params.id;
    //     this.orderType = params.ordType;
    //     this.getStartList(params.id);
    //   }
    // });
  }
  getStartList(id) {
    this.load = false;
    this.api.justGet('basketsList', id, '', '?skip=0&orderType=' + this.orderType)
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
              let price = basket.editByAdmin ? basket.editByAdmin.totalPrice || basket.totalPrice : basket.totalPrice;
              //let price = basket.totalPrice;
              let productPrice = basket.editByAdmin ? basket.editByAdmin.totalPrice || basket.totalPrice : basket.totalPrice;
              //let productPrice = basket.totalPrice;
              let created = basket.data;
              let updated = basket.dataUpdate;
              let time = basket.deliveryTime;
              let status = basket.status;
              let orderNumber = basket.orderNumber;
              let paymentType = basket.paymentType;
              let orderType = basket.orderType;
              let mobile = basket.anyMobile;
              let box = basket.editByAdmin ? basket.editByAdmin.boxesPrice || parseInt(basket.boxesPrice) : parseInt(basket.boxesPrice) || 0 ;
              //let box = basket.boxesPrice;
              let delivery = basket.editByAdmin ? basket.editByAdmin.deliveryPrice || parseInt(basket.deliveryPrice) : parseInt(basket.deliveryPrice) || 0 ;
              //let delivery = basket.deliveryPrice;
              let id = basket._id;
              if (basket.orderType == 'delivery') price += box + delivery;
              if (basket.orderType == 'bySelf') price += box;
              this.list.push(
                new order(client, prods, price, created, updated, status, id, orderNumber, time, adress, paymentType, mobile, box, delivery, productPrice, orderType)
              );
            });
          }
        }
      });

      if (location.href.indexOf("/orders") != -1) {
        setTimeout(() => {
          this.getStartList(id);
        }, 60*1000);
      }
  }

  letPage() {
    this.load = false;
    this.api.justGet('basketsList', this.id, '', '?limit=' + this.col + '&skip=' + ((this.page-1)*this.col) + '&orderType=' + this.orderType)
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
              let id = basket._id;
              if (basket.orderType == 'delivery') price += basket.boxesPrice + basket.deliveryPrice;
              if (basket.orderType == 'bySelf') price += basket.boxesPrice;
              this.list.push(
                new order(client, prods, price, created, updated, status, id, orderNumber, time, adress, paymentType, mobile, box, delivery, productPrice, orderType)
              );
            });
          }
        }
      });

      if (location.href.indexOf("/orders") != -1) {
        setTimeout(() => {
          this.letPage();
        }, 60*1000);
      }

  }

  
  getAll() {
    this.load = false;
    this.api.justGet('basketsList', this.id, '', '?skip=0&orderType=' + this.orderType)
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
              let price = basket.editByAdmin ? basket.editByAdmin.totalPrice || basket.totalPrice : basket.totalPrice;
              //let price = basket.totalPrice;
              let productPrice = basket.editByAdmin ? basket.editByAdmin.totalPrice || basket.totalPrice : basket.totalPrice;
              //let productPrice = basket.totalPrice;
              let created = basket.data;
              let updated = basket.dataUpdate;
              let time = basket.deliveryTime;
              let status = basket.status;
              let orderNumber = basket.orderNumber;
              let paymentType = basket.paymentType;
              let orderType = basket.orderType;
              let mobile = basket.anyMobile;
              let box = basket.editByAdmin ? basket.editByAdmin.boxesPrice || parseInt(basket.boxesPrice) : parseInt(basket.boxesPrice) || 0 ;
              //let box = basket.boxesPrice;
              let delivery = basket.editByAdmin ? basket.editByAdmin.deliveryPrice || parseInt(basket.deliveryPrice) : parseInt(basket.deliveryPrice) || 0 ;
              //let delivery = basket.deliveryPrice;
              let id = basket._id;
              if (basket.orderType == 'delivery') price += box + delivery;
              if (basket.orderType == 'bySelf') price += box;
              this.list.push(
                new order(client, prods, price, created, updated, status, id, orderNumber, time, adress, paymentType, mobile, box, delivery, productPrice, orderType)
              );
            });
          }
        }
      });
  }

  getByStatus(st) {
    this.stActive = st;
    this.list = [];
    this.api.justGet('basketsList', this.id, '', '?status=' + st + '&skip=0&&orderType=' + this.orderType)
      .then((v: any) => {
        
        this.load = true;
        if (v) {
          v.map(basket => {
            let client = basket.owneruser;
            let adress = basket.addressData;
            let prods = basket.productData;
            let price = basket.editByAdmin ? basket.editByAdmin.totalPrice || basket.totalPrice : basket.totalPrice;
            //let price = basket.totalPrice;
            let productPrice = basket.editByAdmin ? basket.editByAdmin.totalPrice || basket.totalPrice : basket.totalPrice;
            //let productPrice = basket.totalPrice;   
            let created = basket.data;
            let updated = basket.dataUpdate;
            let time = basket.deliveryTime;
            let status = basket.status;
            let orderNumber = basket.orderNumber;
            let paymentType = basket.paymentType;
            let orderType = basket.orderType;
            let mobile = basket.anyMobile;
            let box = basket.editByAdmin ? basket.editByAdmin.boxesPrice || parseInt(basket.boxesPrice) : parseInt(basket.boxesPrice) || 0 ;
            //let box = basket.boxesPrice;
            let delivery = basket.editByAdmin ? basket.editByAdmin.deliveryPrice || parseInt(basket.deliveryPrice) : parseInt(basket.deliveryPrice) || 0 ;
            //let delivery = basket.deliveryPrice;
            let id = basket._id;
            if (basket.orderType == 'delivery') price += box + delivery;
              if (basket.orderType == 'bySelf') price += box;
            this.list.push(
              new order(client, prods, price, created, updated, status, id, orderNumber, time, adress, paymentType, mobile, box, delivery, productPrice, orderType)
            );
          });
        }
      });
  }
}
