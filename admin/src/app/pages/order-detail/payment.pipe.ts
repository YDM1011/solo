import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'payment'
})
export class PaymentPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let res = `un know value ${value}`;
    switch(value){
      case 'fiat': res=`Готівкою`; break;
      case 'card': res=`Карткою`; break;
      default: break;
    }
    return res;
  }

}
