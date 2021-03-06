import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'payment'
})
export class PaymentPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let res = `un know value`;
    switch(value){
      case 'fiat': res=`готівкою кур'єру`; break;
      case 'card': res=`карткою`; break;
      case 'coin': res=`Фудкоїнами`; break;
      default: break;
    }
    return res;
  }

}
