export class Ratios {
  constructor(){

  }
  getRatios(model, field){
    let key = `${model}_${field}`;
    let obj = {
      user_bg:{
        ration: 16 / 9,
        width: 850
      },
      user_photo:{
        ration: 1 / 1,
        width: 250
      },
      dish_pic:{
        ration: 1 / 1,
        width: 250
      },

    };
    return obj[key];
  }
}
