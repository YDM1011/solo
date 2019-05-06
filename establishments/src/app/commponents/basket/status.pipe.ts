import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let res = `un know value ${value}`;
    value = parseInt(value);
    switch(value){
      case 0: res=`Нове`; break;
      case 1: res=`В обробці`; break;
      case 2: res=`Підтверджене`; break;
      case 3: res=`Очікується оплата`; break;
      case 4: res=`Оплачене`; break;
      case 5: res=`Змінене оператором`; break;
      case 6: res=`Виконано`; break;
      case 7: res=`Відмінене`; break;
      default: break;
    }
    return res;
  }

}
