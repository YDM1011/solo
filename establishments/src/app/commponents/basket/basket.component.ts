import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  public basket: any;
  public totalPrice: any = 0;

  constructor() { }

  ngOnInit() {
  }

  result(data) {
    let s = this;
    s.basket = data;

    s.basket.products.map(product=>{
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
        s.totalPrice += parseInt(product.portionCheck.price) * parseInt(product.count);
        product.totalPrice = parseInt(product.portionCheck.price) * parseInt(product.count);
        product.dishId.dishcategory.complementbox.map(compl=>{
          console.log(compl.check);
          if (compl.check){
            s.totalPrice += parseInt(compl.price) * parseInt(product.count);
            product.totalPrice += parseInt(compl.price) * parseInt(product.count);
          }
        })
      }

    });

    console.log(s.basket);
  }

  checkPP(product){
    let s = this;
    product.totalPrice = parseInt(product.portionCheck.price);
    product.dishId.dishcategory.complementbox.map(compl=>{
      if (compl.check){
        product.totalPrice += parseInt(compl.price) * parseInt(product.count);
      }
    });
    s.totalPrice += product.totalPrice;
    // product.totalPrice = product.totalPrice * product.count;
  }

  checkPrice(compl, product){
    let s = this;
    compl.check = !compl.check;
    s.totalPrice -= product.totalPrice;
    s.checkPP(product);
    if(product.count < 1){
      product.count = 1;
    }
  }
  addPP(product){
    this.totalPrice -= product.totalPrice;
    product.count++;
    this.checkPP(product)
  }
  decPP(product){
    if (product.count > 1){
      this.totalPrice -= product.totalPrice;
      product.count--;
      this.checkPP(product)
    }
  }
}
