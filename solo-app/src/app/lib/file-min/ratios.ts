export class Ratios {
  constructor(){

  }
  getRatios(model, field){
    let key = `${model}_${field}`;
    let obj = {
      user_bg:195/70,
      user_photo:1/1,
    };
    return obj[key];
  }
}
