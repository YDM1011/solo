import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {

  @Input() categoryId:any;
  @Output() onNull: EventEmitter<any> = new EventEmitter<any>();
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
    if (s.dishes.length>0){
      s.onNull.next(s.categoryId);
    }else{
      s.dishes.map(item=>{
        s.portion[count] = item.portion[0];
        count++;
      });
    }

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
