import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberPhone'
})
export class NumberPhonePipe implements PipeTransform {

  transform(value: any): string {
    let str = value + '';
    return str.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '($1) $2 $3 $4');
  }

}
