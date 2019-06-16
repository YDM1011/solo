import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let res = `un know value ${value}`;
    switch(value){
      case 'delivery': res=`Доставку`; break;
      case 'bySelf': res=`Виніс`; break;
      case 'reserve': res=`Бронювання`; break;
      default: break;
    }
    return res;
  }

}
