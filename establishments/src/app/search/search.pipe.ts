import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], field: string, searchText: any): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it[field].toLowerCase().includes(searchText);
    });
  }
}
// @Injectable()
// export class SearchFilterPipe implements PipeTransform {
//   transform(items: any[], field: string, value: string): any[] {
//     if (!items) return [];
//     return items.filter(it => it[field] == value);
//   }
