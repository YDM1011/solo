
export interface OrderMax {
  id: string,
  orderNumber?: number,
  dataCreate: string,
  dataUpdate: string,
  client: any,
  mobile: string,
  anyMobile: string,
  address: string,
  productPrice: number,
  boxPrice: number,
  deliveryPrice: number,
  status: string,
  products: any[],
  level?: number,
  codeKey?: string,
  isCall?: boolean,
  orderType?: string,
  paymentType?: string,
  orderCommentData?: any,
  paymentDetail?: any,
  deliveryTime?: any,
}

export class FullOrder implements OrderMax{
  public id;
  public dataCreate;
  public dataUpdate;
  public client;
  public mobile;
  public anyMobile;
  public address;
  public productPrice;
  public boxPrice;
  public deliveryPrice;
  public status;
  public products;
  public level?;
  public codeKey?;
  public isCall?;
  public orderType?;
  public paymentType?;
  public orderNumber?;
  public orderCommentData?;
  public paymentDetail?;
  public deliveryTime?;
  constructor( public data? ) {
    let price = 0;
    data.productData.map((prod, i) => {
      if (!prod.status) {
        delete data.productData[i];
      }
    });
    data.productData.map(item => {
       if (item.status) {
        price += item.totalPrice*item.count;
       }
    });
    if (data.status == '5' || data.status == '1' || data.status == '2'){
      this.productPrice = data.editByAdmin ? data.editByAdmin.totalPrice || price : price;
      this.boxPrice = data.editByAdmin ? data.editByAdmin.boxesPrice || parseInt(data.boxesPrice) : parseInt(data.boxesPrice) || 0 ;
      this.deliveryPrice = data.editByAdmin ? data.editByAdmin.deliveryPrice || parseInt(data.deliveryPrice) : parseInt(data.deliveryPrice) || 0 ;
    } else {
      this.productPrice = price;
      this.boxPrice = data.boxesPrice ? parseInt(data.boxesPrice) : 0 ;
      this.deliveryPrice = data.deliveryPrice ? parseInt(data.deliveryPrice) : 0 ;
    }
    if (data.orderType == 'bySelf') this.deliveryPrice = null;
    if (data.orderType == 'reserve') {
      this.deliveryPrice = null;
      this.boxPrice = null;
    }

    this.id = data._id;
    this.deliveryTime = data.deliveryTime;
    this.dataCreate = data.data;
    this.dataUpdate = data.dataUpdate;
    this.client = data.owneruser;
    this.mobile = data.owneruser.mobile;
    this.anyMobile = data.anyMobile;
    this.paymentDetail = data.paymentDetail;
    this.address = data.addressData ? data.addressData.address || (data.estAddressData ? data.estAddressData.address : '') : data.estAddressData ? data.estAddressData.address : '';
    if (data.addressData) {
      this.level = data.addressData.level;
      this.codeKey = data.addressData.codeKey;
    } else {
      this.level = null;
      this.codeKey = null;
    }
    this.status = String(data.status);
    this.products = data.productData;
    this.orderNumber = data.orderNumber;
    this.orderType = data.orderType;
    this.paymentType = data.paymentType;
    this.orderCommentData = data.orderCommentData;
    this.isCall = data.isCall ? 'Так' : 'Ні';
    let obj = {
      id: this.id,
      dataCreate: this.dataCreate,
      dataUpdate: this.dataUpdate,
      client: this.client,
      mobile: this.mobile,
      anyMobile: this.anyMobile,
      address: this.address,
      productPrice: this.productPrice,
      boxPrice: this.boxPrice,
      deliveryPrice: this.deliveryPrice,
      status: this.status,
      level: this.level,
      isCall: this.isCall,
      codeKey: this.codeKey,
      products: this.products,
      orderType: this.orderType,
      paymentType: this.paymentType,
      orderNumber: this.orderNumber,
      orderCommentData: this.orderCommentData,
      deliveryTime: this.deliveryTime,
      paymentDetail: this.paymentDetail
    };
    return obj;
  }
}
