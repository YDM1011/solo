export class Ratios {
  constructor(){

  }
  getRatios(model, field){
    let key = `${model}_${field}`;
    let obj = {
      user_bg: {
        ratios: 195/80,
        width: 975
      },
      user_photo:{
        ratios: 1/1,
        width: 200
      }
    };
    return obj[key];
  }
}
