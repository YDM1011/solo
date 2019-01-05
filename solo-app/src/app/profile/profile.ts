export class userData {
  bornedData: any;
  bornedPlace: string | '';
  education: string | '';
  mobile: string | '';
  address: string | '';
  aboutme: string | '';
  worksPlace: string | '';
  familyStatus: string | '';
  _id: string | '';
  familyStatusName: any;
  constructor() {
    let s = this;
    s.bornedData = '';
    s.bornedPlace = '';
    s.education = '';
    s.mobile = '';
    s.address = '';
    s.aboutme = '';
    s.worksPlace = '';
    s.familyStatus = '';
    s._id = '';
    s.familyStatusName = {};
  }
}
