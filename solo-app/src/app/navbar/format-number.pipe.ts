import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {

  transform(value: any): string {
    let str = value + '';
    return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  }

}
