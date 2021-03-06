import {Component, Injectable, OnChanges, OnInit} from '@angular/core';
import {Basket, BasketData} from "./basket";
import {ApiService} from "../../service/api.service";
import {ActivatedRoute} from "@angular/router";
import {Address, AddressData} from "./address";
import {NgbCalendar, NgbDatepickerI18n, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment';
import Swal from 'sweetalert2';

const I18N_VALUES = {
  en: {
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  ua: {
    weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб','Нд'],
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

  public baskets: Basket[] = [];
  public activeBaskets: Basket;
  public address: Address = new AddressData();
  public addresses:Address[] = [];
  public totalPrice: any = 0;
  public estAdres = [];
  public estAddress = {address:'',_id:''};

  public checkTime;

  public minus = true;

  public pecent = 0.05;
  public html;
  public mobile;
  public button;
  public isValidS;
  public dataStart:any;
  public timeStart = {hour: new Date().getHours() + 1, minute: new Date().getMinutes()-(new Date().getMinutes() % 10)};
  public radioBtnTime:boolean = false;
  public startDay = {    
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };
  public endDay;
  public ctrl;

  public prices = {};
  public onLoaded:boolean = false;
  public isDoOrder:boolean = false;
  public isAddress:boolean = false;
  public isCanEdit:boolean = false;
  public isCart:boolean = false;  
  public minPrice;
  public foodCoin:number = 0;
  public isError:string;
  public orderType;
  public me;
  public originBasketData = [];
  public model;
  public load = true;
  constructor(
    private calendar: NgbCalendar,
    private route: ActivatedRoute,
    private api: ApiService,
  ) { }

  ngOnInit() {
    const s = this;
    // this.route.params.subscribe((params: any) => {
    //   self.initApi();
    // });
    this.load = false;
    this.model = this.calendar.getToday();
    this.dataStart = new Date().toISOString();
    this.api.onMe.subscribe(me => {
      if (me) {
        this.mobile = me.mobile;
        this.me = me;
      }
    });
    this.api.onOnline.subscribe(est=>{
      if(est){
        this.isCart = est.isCart;
        this.foodCoin = parseInt(est.foodCoin);
      }
    });
    //console.log(this.minPrice);
       
    this.init()
  }

  ngOnChanges(){
  }

  timeCheck(basket) {
    //console.log(basket.deliveryTime);
  }

  init() {
    this.api.justGet('basket_from_est', '', '', '?select=-__v&sort={"dataUpdate":-1}').then((data:any)=>{
      this.load = true;
      if (data) {        
        this.getBasketsList(data);
      }      
      
    });
    

    this.dataStart = moment()
      .hour(this.timeStart.hour)
      .minute(this.timeStart.minute).toISOString();
  }
  productUpdate(product, basket, index) {
    basket.products.map(prod => {
      if (prod._id === product._id) {
        prod = product;
        this.prices[prod._id] = prod.totalPrice || 0;
        this.checkPP(product, basket);
      }
      this.baskets[index - 1] = basket;
    });
  }

  getBasketsList (basketsData) {
    let s = this;
    this.originBasketData = [];
    s.baskets = [];
    basketsData.map(data => {
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
      // if (data.deliveryTime) {
      //   alert(data.deliveryTime);
      //   this.dataStart = data.deliveryTime;
      // }
      basketData.deliveryTime = data.deliveryTime || 'false';
      basketData.paymentType = data.paymentType || 'fiat';
      if (data.paymentDetail)
        basketData.paymentDetail.fiatVal = data.paymentDetail.fiatVal || 0;
      basketData.boxesPrice = data.editByAdmin ? data.editByAdmin.boxesPrice || data.boxesPrice : data.boxesPrice;
      // if (basketData.orderType !== 'reserve' && basketData.orderType)
      //   basketData.totalPrice += basketData.boxesPrice;
      basketData.status = data.status;
      basketData.isCanEdit = data.status === '0' || data.status === 0;
      basketData.isCall = data.isCall;
      basketData.ownerEst = data.ownerest._id;
      basketData.ownerEstObj = data.ownerest;
      basketData.html = data.html;
      basketData.menu = data.menuData;

      let maxday = data.menuData.maxtime ? data.menuData.maxtime : 0;

      var dayCount = 32 - new Date(new Date().getFullYear(), new Date().getMonth(), 32).getDate();
      let endDay = (new Date().getDate() + parseInt(maxday) <= dayCount) ? (new Date().getDate() + parseInt(maxday)) : (new Date().getDate() + parseInt(maxday)-dayCount);
      let endMonth = (new Date().getDate() + parseInt(maxday) <= dayCount) ? (new Date().getMonth() + 1) : (new Date().getMonth() + 2);

      this.endDay = {
        year: new Date().getFullYear(),
        month: endMonth,
        day: endDay
      }

      basketData.deliveryWorkTimeAll = data.menuData.deliverytime;
      let numberDay = new Date().getDay() == 0 ? 7 : new Date().getDay();

      switch (numberDay) {
        case 1:
          basketData.deliveryOnline = data.menuData.deliveryonline.timeRange1;
          //basketData.deliveryWorkTime = data.menuData.deliverytime.timeRange1;
          break;
        case 2: 
          basketData.deliveryOnline = data.menuData.deliveryonline.timeRange2;
          //basketData.deliveryWorkTime = data.menuData.deliverytime.timeRange2;
          break;
        case 3: 
          basketData.deliveryOnline = data.menuData.deliveryonline.timeRange3;
          //basketData.deliveryWorkTime = data.menuData.deliverytime.timeRange3;
          break;
        case 4:  
          basketData.deliveryOnline = data.menuData.deliveryonline.timeRange4;
          //basketData.deliveryWorkTime = data.menuData.deliverytime.timeRange4;
          break;
        case 5: 
          basketData.deliveryOnline = data.menuData.deliveryonline.timeRange5;
          //basketData.deliveryWorkTime = data.menuData.deliverytime.timeRange5;
          break;
        case 6: 
          basketData.deliveryOnline = data.menuData.deliveryonline.timeRange6;
          //basketData.deliveryWorkTime = data.menuData.deliverytime.timeRange6;
          break;
        case 7:
          basketData.deliveryOnline = data.menuData.deliveryonline.timeRange7;
          //basketData.deliveryWorkTime = data.menuData.deliverytime.timeRange7;          
          break;
        default:
          break;
      }


      let Hs = parseInt(basketData.deliveryOnline.timeStart.split(":")[0]);
      let Ms = parseInt(basketData.deliveryOnline.timeStart.split(":")[1]);
      let He = parseInt(basketData.deliveryOnline.timeEnd.split(":")[0]);
      let Me = parseInt(basketData.deliveryOnline.timeEnd.split(":")[1]);

      if (He < Hs) He=He+24;      

      if (basketData.deliveryOnline.isWeekend) {
        this.showError("Ми сьогодні зачинені! Ваше замовлення буде оброблене завтра!");
      } else if (new Date().getHours()>=He) {
        if (new Date().getHours() == He && new Date().getMinutes() < Me) {
        } else {
          this.showError("Графік онлайн-замовлень: "+basketData.deliveryOnline.timeStart+" - "+basketData.deliveryOnline.timeEnd+"! Ваше замовлення буде оброблене завтра!");
        }
      } else if (new Date().getHours()<Hs && new Date().getHours()+24 > He) {
        this.showError("Графік онлайн-замовлень: "+basketData.deliveryOnline.timeStart+" - "+basketData.deliveryOnline.timeEnd+"! Ваше замовлення буде оброблене пізніше!");
      }

      basketData.delivery = data.ownerest.delivery;
      basketData.getself = data.ownerest.getself;
      basketData.reservation = data.ownerest.reservation;
      // basketData.isnew = data.dishData.isnew;
      // basketData.ishit = data.dishData.ishit;

      if (basketData.orderType === 'delivery') {
        if (data.deliveryPrice || data.deliveryPrice == 0) { 
          basketData.deliveryPrice = data.deliveryPrice;
        } else {
          basketData.deliveryMinPrice = parseInt(data.menuData.deliveryfree);
          basketData.deliveryPrice =  basketData.deliveryMinPrice > (basketData.totalPrice+basketData.boxesPrice) ?
            (data.editByAdmin ? data.editByAdmin.deliveryPrice || parseInt(data.menuData.delivery) :
              parseInt(data.menuData.delivery)) : 0;
        }
        if (data.editByAdmin) {
          if (data.editByAdmin.deliveryPrice) {
            basketData.deliveryPrice = data.editByAdmin.deliveryPrice;
          }
        }
      } else {
        basketData.deliveryPrice = 0;
      }
      s.baskets.push(basketData);
      basketData.products.map(prod => {
        this.prices[prod._id] = prod.totalPrice / prod.count;
      });
      this.originBasketData.push(Object.assign({}, data));
    });

  }

  statusUpdate(product, basket) {
    this.api.justGet(`basketsList/count?query={"_id":"${basket._id}","status":"0"}`).then((v: any) => {
      if (v.count == 1) {
        this.checkPP(product, basket);
      }
    });
  }
  checkPP(product, basket) {
    this.minus = false;
    let s = this;
    product.totalPrice = parseInt(this.prices[product._id]) * product.count;
    let price = 0;
    basket.products.map(prod => {
      if (prod.status) {
        price += prod.totalPrice;
        if (basket.orderType === 'delivery' || basket.orderType === 'bySelf') {
          price += parseInt(prod.boxData.price);
        }
      }
    });
    basket.totalPrice = price;
    this.originBasketData.map(basketOrigin => {
      if(basketOrigin._id === basket._id) {
        basket.deliveryPrice = basket.deliveryMinPrice > (basket.totalPrice+basket.boxesPrice) ? parseInt(basketOrigin.menuData.delivery) : 0;
      }
    });
    s.api.post('product/' + product._id, {count: product.count,
      status: product.status,
      BasketId: basket._id,
      ownerest: product.ownerest, owneruser: product.owneruser}).then((res: any) => {        
        this.minus = true;
      // s.isShowChange.emit(res._id);
    });
  }
  addPP(product, basket) {
    this.api.justGet(`basketsList/count?query={"_id":"${basket._id}","status":"0"}`).then((v: any) => {
      if (v.count == 1) {
        product.count++;
        this.checkPP(product, basket);
      }
    });
    
  }
  decPP(product, basket) {
    if (product.count > 1) {
      this.api.justGet(`basketsList/count?query={"_id":"${basket._id}","status":"0"}`).then((v: any) => {
        if (v.count == 1) {
          product.count--;
          this.checkPP(product, basket);
        }
      });      
    }
  }
  setActiveBasket(basket) {
    const s = this;
    //console.log(basket);
    if (basket.ownerEstObj)
    if (basket.ownerEstObj.minPrice > parseInt(basket.totalPrice)) {
      return;
    }
    s.isDoOrder = true;
    s.activeBaskets = null;
    s.activeBaskets = basket;
    if (s.activeBaskets.products) {
      s.activeBaskets.boxesPrice = 0;
      s.activeBaskets.products.map(product => {
        if (product.status) s.activeBaskets.boxesPrice += parseInt(product.boxData ? product.boxData.price : 0) * product.count;
      });
    }
    this.api.justGet('oneest?query={"ownerEst":"' + this.activeBaskets.ownerEst + '"}&select=address').then((v:any)=>{
      if (v) {
        this.estAdres = v;
        this.isAddress = false;
        // estAddress.address
        this.estAddress = v[0];
        this.estAddress['isSaved'] = true;
      }
    });
  }
  delBasket(basket) {
    this.api.delet('basketsList', basket._id).then(v => {
      this.api.checkBascketCount(true);
    });
    const index = this.baskets.indexOf(basket);
    this.baskets.splice(index, 1);
  }
  setConfirm(basket) {
    this.api.set('basketsList', {status: '2', confirm:true},basket._id).then(v=>{
      if (v) {
        basket.status = '2';
      }
    });
  }
  setConfirmCoin(basket) {
    this.api.set('basketsList', {status: '6', confirm:true},basket._id).then(v=>{
      if (v) {
        basket.status = '6';
      }
    });
  }
  doOrderDelivery() {    
    //console.log(this.address);
    if (this.address['isSaved']) {
      if (!this.address._id){
        this.showError("поля з зірочкою обов'язкові");
        return
      }
    } else {
      if (!this.address.address){
        this.showError("поля з зірочкою обов'язкові");
        return
      }
    }

    this.activeBaskets.deliveryTime = this.activeBaskets.deliveryTime != 'false' ? this.dataSelected() : null;
    this.activeBaskets.status = "1";
    this.activeBaskets.anyMobile = this.activeBaskets.anyMobile || this.mobile;
    this.activeBaskets.orderType = this.orderType;

    if (this.address['isSaved']) {
      this.activeBaskets.addressData = this.address._id;
    } else {
      this.activeBaskets.customAddress = this.address;
    }

    if (this.activeBaskets.deliveryTime != null) {

      let numberDay = new Date(this.activeBaskets.deliveryTime).getDay() == 0 ? 7 : new Date(this.activeBaskets.deliveryTime).getDay();

        switch (numberDay) {
          case 1:
            this.activeBaskets.deliveryWorkTime = this.activeBaskets.deliveryWorkTimeAll.timeRange1;
            break;
          case 2: 
            this.activeBaskets.deliveryWorkTime = this.activeBaskets.deliveryWorkTimeAll.timeRange2;
            break;
          case 3: 
            this.activeBaskets.deliveryWorkTime = this.activeBaskets.deliveryWorkTimeAll.timeRange3;
            break;
          case 4:  
            this.activeBaskets.deliveryWorkTime = this.activeBaskets.deliveryWorkTimeAll.timeRange4;
            break;
          case 5: 
            this.activeBaskets.deliveryWorkTime = this.activeBaskets.deliveryWorkTimeAll.timeRange5;
            break;
          case 6: 
            this.activeBaskets.deliveryWorkTime = this.activeBaskets.deliveryWorkTimeAll.timeRange6;
            break;
          case 7:
              this.activeBaskets.deliveryWorkTime = this.activeBaskets.deliveryWorkTimeAll.timeRange7;          
            break;
          default:
            break;
        }


      let Hs = parseInt(this.activeBaskets.deliveryWorkTime.timeStart.split(":")[0]);
      let Ms = parseInt(this.activeBaskets.deliveryWorkTime.timeStart.split(":")[1]);
      let He = parseInt(this.activeBaskets.deliveryWorkTime.timeEnd.split(":")[0]);
      let Me = parseInt(this.activeBaskets.deliveryWorkTime.timeEnd.split(":")[1]);


      let HTime = new Date(this.activeBaskets.deliveryTime).getHours() * 60 + new Date(this.activeBaskets.deliveryTime).getMinutes();

      
      let timS = Hs*60+Ms;
      let timE = He*60+Me;

      if(timE<timS){timE += 24*60}

      if (this.activeBaskets.deliveryWorkTime.isAllTime) {}
      else if (this.activeBaskets.deliveryWorkTime.isWeekend) {
        this.showError("Вихідний!");
        return;
      }
      else if (HTime>=timE || HTime < timS) {      
        this.showError("Доставка працює за графіком: "+this.activeBaskets.deliveryWorkTime.timeStart+" - "+this.activeBaskets.deliveryWorkTime.timeEnd+"!");
        return;             
      }

      let mintime = (this.activeBaskets.menu.deliverymintime) ? this.activeBaskets.menu.deliverymintime : 30;

      if (new Date(this.activeBaskets.deliveryTime).getTime() < (new Date().getTime() + (1000 * 60 * mintime))) {
        this.showError("Мінімальний час доставки - "+mintime+" хв! Змініть час або оберіть 'Якомога швидше'");
        return;
      }
    }
    // this.activeBaskets.paymentType = "delivery";
    //console.log(this.activeBaskets);

    
    this.api.set('basketsList', this.activeBaskets, this.activeBaskets._id)
      .then()
      .catch(e => {
        Swal.fire('Error', e.error.error.mess, 'error');
        this.activeBaskets.status = "0";
      });
    this.isDoOrder = false;
  }
  doOrderBySelf() {
    if (this.orderType == 'reserve') {
      if (!this.activeBaskets.clients) {
        this.showError("Поля з зірочкою обов'язкові!");
        return;
      }
      if (this.activeBaskets.clients <= 0) {
        this.showError("Поля з зірочкою обов'язкові!");
        return;
      }
    }
    //console.log(new Date().getHours());    
    //console.log(this.dataSelected());
    if (!this.estAddress || !this.estAddress._id) {
      this.showError("Поля з зірочкою обов'язкові!");
      return;
    }
    if (!this.dataSelected()) return;
    this.activeBaskets.deliveryTime =  this.dataSelected() || '';
    if (!this.activeBaskets.deliveryTime) {
      this.showError("Оберіть дату!");
      return;
    }

    let numberDay = new Date(this.activeBaskets.deliveryTime).getDay() == 0 ? 7 : new Date(this.activeBaskets.deliveryTime).getDay();

      switch (numberDay) {
        case 1:
          this.activeBaskets.deliveryWorkTime = this.activeBaskets.deliveryWorkTimeAll.timeRange1;
          break;
        case 2: 
          this.activeBaskets.deliveryWorkTime = this.activeBaskets.deliveryWorkTimeAll.timeRange2;
          break;
        case 3: 
          this.activeBaskets.deliveryWorkTime = this.activeBaskets.deliveryWorkTimeAll.timeRange3;
          break;
        case 4:  
          this.activeBaskets.deliveryWorkTime = this.activeBaskets.deliveryWorkTimeAll.timeRange4;
          break;
        case 5: 
          this.activeBaskets.deliveryWorkTime = this.activeBaskets.deliveryWorkTimeAll.timeRange5;
          break;
        case 6: 
          this.activeBaskets.deliveryWorkTime = this.activeBaskets.deliveryWorkTimeAll.timeRange6;
          break;
        case 7:
            this.activeBaskets.deliveryWorkTime = this.activeBaskets.deliveryWorkTimeAll.timeRange7;          
          break;
        default:
          break;
      }


    let Hs = parseInt(this.activeBaskets.deliveryWorkTime.timeStart.split(":")[0]);
    let Ms = parseInt(this.activeBaskets.deliveryWorkTime.timeStart.split(":")[1]);
    let He = parseInt(this.activeBaskets.deliveryWorkTime.timeEnd.split(":")[0]);
    let Me = parseInt(this.activeBaskets.deliveryWorkTime.timeEnd.split(":")[1]);


    let HTime = new Date(this.activeBaskets.deliveryTime).getHours() * 60 + new Date(this.activeBaskets.deliveryTime).getMinutes();
    
    let timS = Hs*60+Ms;
    let timE = He*60+Me;

    if(timE<timS){timE += 24*60}

    if (this.activeBaskets.deliveryWorkTime.isAllTime) {}
    else if (this.activeBaskets.deliveryWorkTime.isWeekend) {
      this.showError("Вихідний!");
      return;
    }
    else if (HTime>=timE || HTime < timS) {      
      this.showError("Приймаємо замовлення за графіком: "+this.activeBaskets.deliveryWorkTime.timeStart+" - "+this.activeBaskets.deliveryWorkTime.timeEnd+"!");
      return;             
    }

    let mintime = (this.activeBaskets.menu.deliverymintime) ? this.activeBaskets.menu.deliverymintime : 30;

    if (new Date(this.activeBaskets.deliveryTime).getTime() < (new Date().getTime() + (1000 * 60 * mintime))) {
      this.showError("Приймаємо замовлення не раніше як за "+mintime+" хв!");
      return;
    }

    this.activeBaskets.status = "1";
    this.activeBaskets.anyMobile = this.activeBaskets.anyMobile || this.mobile;
    this.activeBaskets.orderType = this.orderType;

    if (this.estAddress['isSaved']) {
      this.activeBaskets.estAddressData = this.estAddress._id;
    }else{
      this.activeBaskets.customAddress = this.estAddress;
    }
    this.api.set('basketsList', this.activeBaskets, this.activeBaskets._id)
      .then()
      .catch(e => {
        Swal.fire('Error', e.error.error.mess, 'error');
        this.activeBaskets.status = "0";
      });
    this.isDoOrder = false;
  }
  showError(err = '') {
    this.isError = err;
  }
  dataSelected(e = null) {
    //console.log("dataEvent", e);
    if (!this.timeStart){
      this.showError("Поля з зірочкою обов'язкові!");
      return false;
    }
    if (this.timeStart.hour == null || this.timeStart.minute == null){
      this.showError("Поля з зірочкою обов'язкові!");
      return false;
    }
    if (this.timeStart.hour < new Date().getHours() &&
      ( new Date(this.dataStart+1).getDate() ==  new Date().getDate())){
      this.showError("Оберіть дату в календарі!");
      return false;
    }
    // if (!e) {
    //   e = {};
    //   e['year'] = new Date(this.activeBaskets.deliveryTime).getFullYear();
    //   e['month'] = new Date(this.activeBaskets.deliveryTime).getMonth() + 1;
    //   e['day'] = new Date(this.activeBaskets.deliveryTime).getDate();
    // }
    // if (!e.year || !(e.month - 1) ||  !e.day) {
    //   e['year'] = new Date().getFullYear();
    //   e['month'] = new Date().getMonth() + 1;
    //   e['day'] = new Date().getDate();
    // }
    if (this.dataStart && !e){
      this.dataStart = moment(this.dataStart)
        .hour(this.timeStart.hour)
        .minute(this.timeStart.minute).toISOString();
    }else{
      this.dataStart = new Date(e.year, (e.month - 1), e.day, this.timeStart.hour, this.timeStart.minute).toISOString();
    }
    //console.log(this.dataStart);
    // this.activeBaskets.deliveryTime = this.dataStart;
    return this.dataStart;
  }
  test() {
    this.api.justGet('test', '', '', '').then((data: any) => {
      this.button = data.html;
      //console.log(this.button);
    });
  }

  getAddress() {
    this.isAddress = !this.isAddress;
    if (this.isAddress) {
      this.api.justGet('address', '', '', '?select=-__v&query={"owneruser":"' + this.activeBaskets.owneruser+'"}').then((data:any)=>{
        if (data) {
          this.addresses = (data);
        }
      });
    }

  }
  checkAddress(adrs) {
    this.isAddress = !this.isAddress;
    this.address = adrs;
    this.address['isSaved'] = true;
  }
  getEstAddress() {
    this.isAddress = !this.isAddress;
    if (this.isAddress) {
      this.api.justGet('oneest?query={"ownerEst":"' + this.activeBaskets.ownerEst + '"}&select=address').then((v:any)=>{
        if (v) {
          this.estAdres = v;
        }
      });
    }
  }
  checkEstAddress(adrs) {
    this.isAddress = !this.isAddress;
    this.estAddress = adrs;
    this.estAddress['isSaved'] = true;
  }
  checkDelivery() {
    this.orderType = 'delivery';
    this.activeBaskets.deliveryPrice = parseInt(this.activeBaskets.menu.deliveryfree) > (this.activeBaskets.totalPrice+this.activeBaskets.boxesPrice) ? parseInt(this.activeBaskets.menu.delivery) : 0;
  }
}
