export class Post {
  des: string | '';
  img: any;
  withFriend: any;
  inPlace: any;
  imression: {name: ''};
  userId: string | '';
  mobile: string | '';
  login: string | '';
  share: any;
  constructor() {
    this.des = '';
    this.img = [];
    this.userId = '';
    this.share = {};
    this.withFriend = [];
    this.inPlace = {id:null,place:''};
    this.mobile = '';
    this.login = '';
    this.imression = {name: ''};
  }
}
