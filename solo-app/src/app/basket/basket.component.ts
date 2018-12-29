import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FormApiService} from '../lib/form-api/form-api.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  public domain: string = environment.apiDomain;
  public baskets;
  public basket: any;
  public totalPrice: any = 0;

  constructor(
    private http:  HttpClient,
    private api: FormApiService
  ) { }

  ngOnInit() {
    const s = this;
    this.http.get(this.domain + '/api/basket_user', this.api.getHeaders())
      .subscribe((products: any) => {
       if (products) {
         console.log(products);
         s.baskets = products;
         s.baskets.map(basket=>{
           basket.totalPrice = 0;
           s.result(basket);
         })
       }
      });
  }

  result(data) {
    let s = this;
    s.basket = data;

    s.basket.products.map(product=>{
      product.count = 1;
      product.dishId.dishcategory.complementbox.map(compl=>{
        compl.check = false;
        product.complement.map(compl2=>{
          if (compl._id == compl2){
            compl.check = true;
          }
        })
      })
    });

    s.basket.products.map(product => {
      if(product.portionCheck){
        s.basket.totalPrice += parseInt(product.portionCheck.price) * parseInt(product.count);
        product.totalPrice = parseInt(product.portionCheck.price) * parseInt(product.count);
        product.dishId.dishcategory.complementbox.map(compl=>{
          console.log(compl.check);
          if (compl.check){
            s.basket.totalPrice += parseInt(compl.price) * parseInt(product.count);
            product.totalPrice += parseInt(compl.price) * parseInt(product.count);
          }
        })
      }

    });

    console.log(s.basket);
  }

  checkPP(b,product){
    let s = this;
    product.totalPrice = parseInt(product.portionCheck.price);
    product.dishId.dishcategory.complementbox.map(compl=>{
      if (compl.check){
        product.totalPrice += parseInt(compl.price) * parseInt(product.count);
      }
    });
    b.totalPrice += product.totalPrice;
    // product.totalPrice = product.totalPrice * product.count;
  }

  checkPrice(b,compl, product){
    let s = this;
    compl.check = !compl.check;
    b.totalPrice -= product.totalPrice;
    s.checkPP(b,product);
    if(product.count < 1){
      product.count = 1;
    }
  }
  addPP(b,product){
    b.totalPrice -= product.totalPrice;
    product.count++;
    this.checkPP(b,product)
  }
  decPP(b,product){
    if (product.count > 1){
      b.totalPrice -= product.totalPrice;
      product.count--;
      this.checkPP(b,product)
    }
  }
  changeCount(basket,pc,v){
    console.log(pc,v);
    v = parseInt(v);
    if (typeof v == "number" && v){
      console.log("OK");
      pc.count = v;
      basket.totalPrice=basket.totalPrice - pc.totalPrice;
      this.checkPP(basket,pc)
    }else{
      console.log("OK");
      pc.count = 1;
    }
  }
}
