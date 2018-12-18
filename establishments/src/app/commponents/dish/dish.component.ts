import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ApiService} from '../../service/api.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {

  @Input() categoryId: any;
  @Input() dish: any;
  @Input() menuId: any;
  @Output() onNull: EventEmitter<any> = new EventEmitter<any>();
  public portion: any = [];
  public dishes: any;
  public portionActive: any;
  public isAddPop = false;
  public dishObject = {};
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
  }
  onapi(obj) {
    const s = this;
    const d = [];
    obj.map(dish => {
      s.dish.map(dsh => {
        if (dish._id === dsh) {
          d.push(dish);
        }
      });
    });
    s.dishes = d;
    let count = 0;
    if (s.dishes.length > 0) {
      s.dishes.map(item => {
        s.portion[count] = item.portion[0];
        count++;
      });
    } else {
      console.log(s.dishes);
      s.onNull.next(s.categoryId);
    }
    s.setPortion(obj);
  }
  select(obj, dish) {
    const s = this;
    dish.prt = obj;
  }
  liked(dish) {
    const s = this;
    s.api.post('likeDish', {_id: dish._id}).then((res: any) => {
      if (res) {
        dish.dishlike = res;
      }
    });
  }
  preToBasket(d){
    let s = this;
    s.isAddPop = true
    s.dishObject = Object.assign({},d);
  }
  toBasket(id, portion) {
    const s = this;
    const obj = {
      portion: portion,
      count: 1,
      dishId: id,
    };
    s.api.post('add_product', obj).then((res: any) => {
      console.log(res);
    });
  }
  setPortion(e){
    e.map(dish=>{
      dish.prt = dish.portion[0];
    })

  }
}
