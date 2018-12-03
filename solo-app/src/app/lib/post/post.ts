export class Post {
  des: string | '';
  img: any;
  withFriend: any;
  inPlace: {place: '', id: '', value: ''};
  imression: {name: ''};
  userId: string | '';
  share: any;
  constructor() {
    this.des = '';
    this.img = [];
    this.userId = '';
    this.share = {};
    this.withFriend = [];
    this.inPlace = {place: '', id: '', value: ''};
    this.imression = {name: ''};
  }
}
