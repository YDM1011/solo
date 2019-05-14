import {Component, Injectable, OnChanges, OnInit} from '@angular/core';
import {Basket, BasketData} from "./basket";
import {ApiService} from "../../service/api.service";
import {ActivatedRoute} from "@angular/router";
import {Address, AddressData} from "./address";
import {NgbDatepickerI18n, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment'

const I18N_VALUES = {
  en: {
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  ua: {
    weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Нд', 'Сб'],
    months: ['Січ', 'Лют', 'Бер', 'Квіт', 'Трав', 'Черв', 'Лип', 'Серп', 'Вер', 'Жовт', 'Лист', 'Груд'],
  }
};

// Define a service holding the language. You probably already have one if your app is i18ned.
@Injectable()
export class I18n {
  language = 'ua';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }
  getDayAriaLabel(date: NgbDateStruct): string {return ''}
}

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
})
export class BasketComponent implements OnInit, OnChanges {

  public baskets:Basket[] = [];
  public activeBaskets:Basket;
  public address:Address = new AddressData();
  public addresses:Address[] = [];
  public totalPrice: any = 0;
  public estAdres = [];
  public estAddress = {address:'',_id:''};

  public html;
  public mobile;
  public button;
  public isValidS;
  public dataStart:any = new Date().toISOString();
  public timeStart = {hour: new Date().getHours(), minute: new Date().getMinutes()};
  public radioBtnTime:boolean = false;

  public prices = {};
  public onLoaded:boolean = false;
  public isDoOrder:boolean = false;
  public isAddress:boolean = false;
  public isCanEdit:boolean = false;
  public isError:string;
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
    this.api.justGet('basket_from_est','','','?select=-__v&sort={"dataUpdate":-1}').then((data:any)=>{
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

  statusUpdate(product,basket){
    this.checkPP(product, basket);
  }
  checkPP(product, basket){
    let s = this;
    product.totalPrice = parseInt(this.prices[product._id]) * product.count;
    let price = 0;
    basket.products.map(prod=>{
      if (prod.status){
        price += prod.totalPrice;
        if(basket.orderType == 'delivery' || basket.orderType == 'bySelf'){
          price += parseInt(prod.boxData.price)
        }
      }
    });
    basket.totalPrice = price;
    this.originBasketData.map(basketOrigin=>{
      if(basketOrigin._id == basket._id){
        basket.deliveryPrice = basket.deliveryMinPrice > basket.totalPrice ? parseInt(basketOrigin.menuData.delivery) : 0;
      }
    });
    s.api.post('product/'+product._id, {count:product.count,
      status:product.status,
      BasketId:basket._id,
      ownerest: product.ownerest, owneruser:product.owneruser}).then((res: any) => {
      // s.isShowChange.emit(res._id);
    });
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
  delBasket(basket){
    this.api.delet('basketsList', basket._id).then(v=>{
      this.api.checkBascketCount(true);
    });
    let index = this.baskets.indexOf(basket);
    this.baskets.splice(index,1);
  }
  setConfirm(basket){
    this.api.set('basketsList', {status: '2', confirm:true},basket._id).then(v=>{
      if(v){
        basket.status = '2';
      }
    });
  }
  doOrderDelivery(){
    if(this.activeBaskets.paymentType){
      if(this.activeBaskets.paymentType == 'fiat'){
        if(!this.activeBaskets.paymentDetail.fiatVal || this.activeBaskets.paymentDetail.fiatVal<=0){
          this.showError("поля з зірочкою обов'язкові");
          return
        }
      }
    }else{this.showError("поля з зірочкою обов'язкові");}
    if (!(this.address._id || this.address)){
      this.showError("поля з зірочкою обов'язкові");
      return
    }
    this.activeBaskets.deliveryTime = this.activeBaskets.deliveryTime != 'false' ? this.dataSelected() : null;
    this.activeBaskets.status = "1";
    this.activeBaskets.anyMobile = this.activeBaskets.anyMobile || this.mobile;
    this.activeBaskets.orderType = this.orderType;

    if (this.address['isSaved']){
      this.activeBaskets.addressData = this.address._id;
    }else{
      this.activeBaskets.customAddress = this.address;
    }
    // this.activeBaskets.paymentType = "delivery";
    console.log(this.activeBaskets,this.address);
    this.api.set('basketsList', this.activeBaskets, this.activeBaskets._id);
    this.isDoOrder = false;
  }
  doOrderBySelf(){
    console.log(this.activeBaskets.orderType);
    console.log(this.activeBaskets.clients);
    console.log(this.activeBaskets.clients<=0);
    if(this.orderType == 'reserve'){
      if(!this.activeBaskets.clients){
        this.showError("поля з зірочкою обов'язкові");
        return
      }
      if(this.activeBaskets.clients<=0){
        this.showError("поля з зірочкою обов'язкові");
        return
      }
    }
    if(this.activeBaskets.paymentType){
      if(this.activeBaskets.paymentType == 'fiat'){
        console.log(!this.activeBaskets.paymentDetail.fiatVal, this.activeBaskets.paymentDetail.fiatVal);
        if(!this.activeBaskets.paymentDetail.fiatVal || this.activeBaskets.paymentDetail.fiatVal<=0){
          this.showError("поля з зірочкою обов'язкові");
          return
        }
      }
    }else{this.showError("поля з зірочкою обов'язкові");}
    if (!this.dataSelected() || !this.estAddress || !this.estAddress._id){
      this.showError("поля з зірочкою обов'язкові");
      return
    }
    this.activeBaskets.deliveryTime = this.activeBaskets.deliveryTime != 'false' ? this.dataSelected() : null;
    this.activeBaskets.status = "1";
    this.activeBaskets.anyMobile = this.activeBaskets.anyMobile || this.mobile;
    this.activeBaskets.orderType = this.orderType;

    if (this.estAddress['isSaved']){
      this.activeBaskets.estAddressData = this.estAddress._id;
    }else{
      this.activeBaskets.customAddress = this.estAddress;
    }
    this.api.set('basketsList', this.activeBaskets, this.activeBaskets._id);
    this.isDoOrder = false;
  }
  doOrderReserve(){

  }
  showError(err=''){
    this.isError = err;
  }
  dataSelected(e = null){
    if (!this.timeStart) return false;
    if (!this.timeStart.hour || !this.timeStart.minute) return false;
    if (!e){
      e = {};
      e['year'] = new Date(this.activeBaskets.deliveryTime).getFullYear();
      e['month'] = new Date(this.activeBaskets.deliveryTime).getMonth()+1;
      e['day'] = new Date(this.activeBaskets.deliveryTime).getDate();
    }
    if (!e.year || !(e.month-1) ||  !e.day) {
      e['year'] = new Date().getFullYear();
      e['month'] = new Date().getMonth()+1;
      e['day'] = new Date().getDate();
    }
    this.dataStart = new Date(e.year, (e.month-1), e.day, this.timeStart.hour, this.timeStart.minute).toISOString();
    return this.dataStart;
  }
  test(){
    this.api.justGet('test','','','').then((data:any)=>{
      this.button = data.html;
      console.log(this.button)
    })
  }

  getAddress(){
    this.isAddress = !this.isAddress;
    if(this.isAddress){
      this.api.justGet('address','','','?select=-__v&query={"owneruser":"'+this.activeBaskets.owneruser+'"}').then((data:any)=>{
        if (data){
          this.addresses = (data)
        }
      });
    }

  }
  checkAddress(adrs){
    this.isAddress = !this.isAddress;
    this.address = adrs;
    this.address['isSaved'] = true;
  }
  getEstAddress(){
    this.isAddress = !this.isAddress;
    if(this.isAddress){
      this.api.justGet('oneest?query={"ownerEst":"'+this.activeBaskets.ownerEst+'"}&select=address').then((v:any)=>{
        if (v){
          this.estAdres = v;
        }
      })
    }
  }
  checkEstAddress(adrs){
    this.isAddress = !this.isAddress;
    this.estAddress = adrs;
    this.estAddress['isSaved'] = true;
  }
  checkDelivery(){
    this.orderType='delivery';
    this.activeBaskets.deliveryPrice = parseInt(this.activeBaskets.menu.deliveryfree) > this.activeBaskets.totalPrice ? parseInt(this.activeBaskets.menu.delivery) : 0;
  }
}
