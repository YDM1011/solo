
export interface Address {
  _id: string,
  address: string,
  level: number,
  codeKey: string,
  isSaved?: boolean
}

export class AddressData implements Address {
  public _id;
  public address;
  public level;
  public codeKey;
  constructor(
    public customObj?: any
  ){
    this._id = this.customObj ? this.customObj._id : '';
    this.address = this.customObj ? this.customObj.address : '';
    this.level = this.customObj ? this.customObj.level : '';
    this.codeKey = this.customObj ? this.customObj.codeKey : '';
    let obj = {
      _id: this._id,
      address: this.address,
      level: this.level,
      codeKey: this.codeKey,
    };
    return obj;
  }
}
