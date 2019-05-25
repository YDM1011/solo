import { Component, OnInit } from '@angular/core';
import {Basket, BasketData} from "../basket/basket";
import {Address, AddressData} from "../basket/address";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../service/api.service";
import * as moment from 'moment';


@Component({
  selector: 'app-basket-history',
  templateUrl: './basket-history.component.html',
  styleUrls: ['./basket-history.component.css']
})
export class BasketHistoryComponent implements OnInit {


  public baskets:Basket[] = [];
  public activeBaskets:Basket;
  public address:Address = new AddressData();
  public totalPrice: any = 0;

  public mobile;
  public button;
  public isValidS;
  public dataStart: any = new Date().toISOString();
  public timeStart = {hour: new Date().getHours(), minute: new Date().getMinutes()};
  public radioBtnTime: boolean = false;

  public prices = {};
  public onLoaded:boolean = false;
  public isDoOrder:boolean = false;
  public orderType;
  public originBasketData = [];
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
  ) { }

  ngOnInit() {
    const s = this;
    // this.route.params.subscribe((params: any) => {
    //   self.initApi();
    // });

    this.api.onMe.subscribe(me=>{
      if(me){
        this.mobile = me.mobile;
      }
    });
    this.init()
  }

  ngOnChanges(){
  }

  timeCheck(basket){
    console.log(basket.deliveryTime)
  }

  init(){
    this.api.justGet('basket_from_est','','','?select=-__v&status=history').then((data:any)=>{
      if (data){
        this.getBasketsList(data)
      }
    });
    this.dataStart = moment()
      .hour(this.timeStart.hour)
      .minute(this.timeStart.minute).toISOString();
  }
  productUpdate(product, basket, index){
    basket.products.map(prod=>{
      if(prod._id==product._id){
        prod = product;
        this.prices[prod._id] = prod.totalPrice;
        this.checkPP(product, basket)
      }
      this.baskets[index-1] = basket;
    })
  }

  getBasketsList(basketsData){
    let s = this;
    this.originBasketData = [];
    basketsData.map(data=>{
      let _id = data._id;
      let name = `${data.ownerest.name}`;
      let time = data.dataUpdate;
      let totalPrice = data.editByAdmin ?  data.editByAdmin.totalPrice || data.totalPrice : data.totalPrice;
      let product = data.productData;
      let estLogo = data.ownerest.av;
      let status = data.status.id;
      s.onLoaded = true;
      let basketData = new BasketData(_id, name, time, totalPrice, product, estLogo, status, data.orderCommentData);
      basketData.owneruser = data.owneruser;
      basketData.orderType = data.orderType;
      basketData.anyMobile = data.anyMobile;
      if (data.deliveryTime)
        this.dataStart = data.deliveryTime;
      basketData.deliveryTime = data.deliveryTime || 'false';
      basketData.paymentType = data.paymentType || "fiat";
      if(data.paymentDetail)
        basketData.paymentDetail.fiatVal = data.paymentDetail.fiatVal || 0;
      basketData.boxesPrice = data.editByAdmin ? data.editByAdmin.boxesPrice || data.boxesPrice : data.boxesPrice;
      if (basketData.orderType != 'reserve' && basketData.orderType)
        basketData.totalPrice += basketData.boxesPrice;
      basketData.status = data.status;
      basketData.isCanEdit = data.status == "0" || data.status == 0;
      basketData.isCall = data.isCall;
      basketData.ownerEst = data.ownerest._id;
      basketData.html = data.html;
      basketData.menu = data.menuData;

      basketData.delivery = data.ownerest.delivery;
      basketData.getself = data.ownerest.getself;
      basketData.reservation = data.ownerest.reservation;

      if(basketData.orderType == 'delivery'){
        basketData.deliveryMinPrice = parseInt(data.menuData.deliveryfree);
        basketData.deliveryPrice =  basketData.deliveryMinPrice > basketData.totalPrice ? (data.editByAdmin ? data.editByAdmin.deliveryPrice || parseInt(data.menuData.delivery) : parseInt(data.menuData.delivery)) : 0;
        if(data.editByAdmin){
          if(data.editByAdmin.deliveryPrice){
            basketData.deliveryPrice = data.editByAdmin.deliveryPrice;
          }
        }
      }else{
        basketData.deliveryPrice = 0;
      }

      s.baskets.push(basketData);
      basketData.products.map(prod=>{
        this.prices[prod._id] = prod.totalPrice / prod.count;
      });
      this.originBasketData.push(Object.assign({},data))
    });

  }


  checkPP(product, basket){
    let s = this;
    product.totalPrice = parseInt(this.prices[product._id]) * product.count;
    let price = 0;
    basket.products.map(prod=>{
      price += prod.totalPrice + parseInt(prod.boxData.price) * prod.count;
    });
    basket.totalPrice = price;
    this.originBasketData.map(basketOrigin=>{
      if(basketOrigin._id == basket._id){
        basket.deliveryPrice = basket.deliveryMinPrice > basket.totalPrice ? parseInt(basketOrigin.menuData.delivery) : 0;
      }
    })
  }
  addPP(product, basket){
    product.count++;
    this.checkPP(product, basket)
  }
  decPP(product, basket){
    if (product.count > 1){
      product.count--;
      this.checkPP(product, basket)
    }
  }
  setActiveBasket(basket){
    let s = this;
    s.isDoOrder=true;
    s.activeBaskets = null;
    s.activeBaskets = basket;
    if(s.activeBaskets.products){
      s.activeBaskets.boxesPrice = 0;
      s.activeBaskets.products.map(product=>{
        s.activeBaskets.boxesPrice += parseInt(product.boxData.price) * product.count;
      })
    }
  }

}
