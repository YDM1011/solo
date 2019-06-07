export interface OrderMin {
  client: any,
  products: any[],
  price: number,
  dataCreate: string,
  dataUpdate: string,
  status: string,
  _id: string,
  orderNumber: string
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
    public orderNumber
  ){
    let obj = {
      client: this.client,
      products: this.products,
      price: this.price,
      dataCreate: this.dataCreate,
      dataUpdate: this.dataUpdate,
      status: this.status,
      orderNumber: this.orderNumber,
      _id: this._id
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
