export class userData {
  bornedData: any;
  bornedPlace: string | '';
  education: string | '';
  mobile: string | '';
  address: string | '';
  aboutme: string | '';
  worksPlace: string | '';
  _id: string | '';
  familyStatus: any;
  bg: any;
  photo: any;
  links: any;
  constructor() {
    let s = this;
    s.bornedData = '';
    s.bornedPlace = '';
    s.education = '';
    s.mobile = '';
    s.address = '';
    s.aboutme = '';
    s.worksPlace = '';
    s.bg = '';
    s.photo = '';
    s._id = '';
    s.familyStatus = {};
    s.links = {};
  }
}
