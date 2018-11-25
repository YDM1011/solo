import { Component, OnInit, Input } from '@angular/core';
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {

  @Input() categoryId:any;
  public portion:any = [];
  public dishes:any;
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
  }
  onapi(obj){
    let s = this;
    s.dishes = obj;
    let count = 0;
    s.dishes.map(item=>{
      s.portion[count] = item.portion[0];
      count++;
    });
  }
  select(obj, i){
    let s = this;
    s.portion[i] = obj;
  }
  liked(dish){
    let s = this;
    s.api.post('likeDish',{_id: dish._id}).then((res:any)=>{
      if(res){
        dish.dishlike = res;
      }
    })
  }
  toBasket(id,portion){
    let s = this;
    let obj = {
      portion: portion,
      count: 1,
      dishId: id,
    };
    s.api.post('add_product',obj).then((res:any)=>{
      console.log(res);
    })
  }
}
