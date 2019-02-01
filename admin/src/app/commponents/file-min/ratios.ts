export class Ratios {
  constructor(){

  }
  getRatios(model, field){
    let key = `${model}_${field}`;
    let obj = {
      dish_pic:{
        ratios: 1/1,
        width: 700
      },
      establishment_av:{
        ratios: 1/1,
        width: 200
      },
      action_pic:{
        ratios: 1/1,
        width: 700
      },
      establishment_bg:{
        ratios: 195/80,
        width: 975
      },
    };
    return obj[key];
  }
}
