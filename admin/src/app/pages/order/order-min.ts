export interface OrderMin {
  client: any,
  products: any[],
  price: number,
  dataCreate: string,
  dataUpdate: string,
  status: string,
  _id: string,
  orderNumber: string,
  time: any,
  adress: any,
  paymentType: string,
  mobile: string,
  box: number,
  delivery: number,
  productPrice: number,
  orderType: string
}

export interface OrderBalans {
  client: any,
  price: number,
  dataCreate: string,
  dataUpdate: string,
  status: string,
  _id: string,
  orderNumber: string,
  paymentType: string,
  history: boolean,
  type: string
}

export class order implements OrderMin{

  constructor(
    public client,
    public products,
    public price,
    public dataCreate,
    public dataUpdate,
    public status,
    public _id,
    public orderNumber,
    public time,
    public adress,
    public paymentType,
    public mobile,
    public box,
    public delivery,
    public productPrice,
    public orderType
  ){
    let obj = {
      client: this.client,
      products: this.products,
      price: this.price,
      dataCreate: this.dataCreate,
      dataUpdate: this.dataUpdate,
      status: this.status,
      orderNumber: this.orderNumber,
      _id: this._id,
      time: this.time,
      adress: this.adress,
      paymentType: this.paymentType,
      mobile: this.mobile,
      box: this.box,
      delivery: this.delivery,
      productPrice: this.productPrice,
      orderType: this.orderType
    };
    return obj;
  }
}

export class orderBal implements OrderBalans{

  constructor(
    public client,
    public price,
    public dataCreate,
    public dataUpdate,
    public status,
    public _id,
    public orderNumber,
    public paymentType,
    public history,
    public type
  ){
    let obj = {
      client: this.client,
      price: this.price,
      dataCreate: this.dataCreate,
      dataUpdate: this.dataUpdate,
      status: this.status,
      orderNumber: this.orderNumber,
      _id: this._id,
      paymentType: this.paymentType,
      history: this.history,
      type: this.type
    };
    return obj;
  }
}
