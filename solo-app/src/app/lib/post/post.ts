export class Post {
  des: string | '';
  img: any;
  withFriend: any;
  inPlace: {place: ''};
  imression: {name: ''};
  userId: string | '';
  constructor() {
    this.des = '';
    this.img = [];
    this.userId = '';
    this.withFriend = [];
    this.inPlace = {place: ''};
    this.imression = {name: ''};
  }
}
