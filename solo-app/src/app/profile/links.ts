export class profileLinks {
  links:any;
  constructor () {
    this.links = [
      {
        imgUrl: 'printerest',
        name: 'printerest',
        value: ''
      },
      {
        imgUrl: 'faceboock',
        name: 'faceboock',
        value: ''
      },
      {
        imgUrl: 'google',
        name: 'google',
        value: ''
      },
      {
        imgUrl: 'instagram',
        name: 'instagram',
        value: ''
      },
    ];

  }
  public getLinks(){
    return this.links
  }
  public getChecked(key){
    let obg = {
      printerest: {
        imgUrl: 'printerest',
        name: 'printerest',
        value: ''
      },
      facebook: {
        imgUrl: 'faceboock',
        name: 'facebook',
        value: ''
      },
      google: {
        imgUrl: 'google',
        name: 'google',
        value: ''
      },
      instagram: {
        imgUrl: 'instagram',
        name: 'instagram',
        value: ''
      }
    };
    return obg[key]
  }
}
