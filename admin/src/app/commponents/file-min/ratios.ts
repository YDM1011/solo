export class Ratios {
  constructor(){

  }
  getRatios(model, field){
    let key = `${model}_${field}`;
    console.log("key", key);
    let obj = {
      dish_pic:1/1,
      establishment_av:1/1,
      establishment_bg:195/70,
    };
    return obj[key];
  }
}
