import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {

  transform(value: any): string {
    const str = String(parseInt(value));
    // @ts-ignore
    return (str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
  }

}
