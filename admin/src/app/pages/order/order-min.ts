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
