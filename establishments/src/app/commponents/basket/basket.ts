export interface Comment{
  text: string,
  entity: string
}
export interface Payment{
  fiatVal: number
}

export interface Basket {
  _id: string,
  name: string,
  data: string,
  totalPrice: number,
  products: any[],
  estLogo: string,
  status: string,
  orderCommentData?: Comment[],
  anyMobile?: string,
  deliveryTime?: string,
  orderType?: string,
  paymentType?: string
  boxesPrice?: number
  deliveryPrice?: number
  deliveryMinPrice?: number
  isCall?: boolean
  paymentDetail?: Payment
  customAddress?: any
  addressData?: any
  estAddressData?: any
  isCanEdit?: boolean
  ownerEst?: string
  html?: string
  menu?: any
}

export class BasketData implements Basket{
  public orderType?;
  public anyMobile?;
  public deliveryTime?;
  public paymentType? = "fiat";
  public boxesPrice?;
  public deliveryPrice?;
  public deliveryMinPrice?;
  public customAddress?;
  public isCall? = false;
  public isCanEdit? = false;
  public ownerEst?;
  public estAddressData?;
  public html?;
  public menu?;
  public paymentDetail? = {fiatVal:0};
  constructor(
    public _id,
    public name,
    public data,
    public totalPrice,
    public products,
    public estLogo,
    public status,
    public orderCommentData){
    let obj = {
      _id: this._id,
      name: this.name,
      data: this.data,
      totalPrice: this.totalPrice,
      products: this.products,
      estLogo: this.estLogo,
      status: this.status,
      orderCommentData: this.orderCommentData.length>0 ? this.orderCommentData : [{text: '', entity: 'user'}],
      orderType: this.orderType,
      anyMobile: this.anyMobile,
      deliveryTime: this.deliveryTime,
      paymentType: this.paymentType || 'fiat',
      boxesPrice: this.boxesPrice,
      deliveryPrice: this.deliveryPrice,
      deliveryMinPrice: this.deliveryMinPrice,
      isCall: this.isCall,
      paymentDetail: this.paymentDetail,
      customAddress: this.customAddress,
      isCanEdit: this.isCanEdit,
      ownerEst: this.ownerEst,
      estAddressData: this.estAddressData,
      html: this.html,
      menu: this.menu,
    };
    return obj;
  }
}
