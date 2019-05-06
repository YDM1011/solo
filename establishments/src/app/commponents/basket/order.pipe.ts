import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let res = `un know value ${value}`;
    switch(value){
      case 'delivery': res=`Доставка`; break;
      case 'bySelf': res=`На виніс`; break;
      case 'reserve': res=`Замовлення столика`; break;
      default: break;
    }
    return res;
  }

}
