export interface Product {
  dishData: string,
  portItemData: string,
  menuData: string,
  complementData?: {id:string,count:number}[],
  categoryData: string,
  boxData: string,
  orderCommentData?: {text:string}[],
  BasketId?: string,
  count: number
}

export class ProductObj implements Product{
  dishData = '';
  BasketId? = '';
  portItemData = '';
  menuData = '';
  complementData = [];
  categoryData = '';
  boxData = '';
  orderCommentData = [];
  count = 1;
  constructor(){
    return {
      dishData: this.dishData,
      portItemData: this.portItemData,
      menuData: this.menuData,
      complementData: this.complementData,
      categoryData: this.categoryData,
      boxData: this.boxData,
      orderCommentData:this.orderCommentData,
      count: this.count,
      BasketId: this.BasketId,
    }
  }
}
