import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ApiService} from '../../service/api.service';
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute} from "@angular/router";

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
    private api: ApiService,
    private route: ActivatedRoute,
    private cookie: CookieService
  ) { }

  ngOnInit() {
    this.menuId = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe((params: any) => {
      this.menuId = this.route.snapshot.paramMap.get('id');
    });
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
        item[item._id] = s.checkIconActive(item.dishlike);
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
        dish[dish._id] = s.checkIconActive(dish.dishlike);
      }
    });
  }
  preToBasket(d){
    let s = this;
    s.isAddPop = true;
    s.dishObject = Object.assign({},d);
  }

  setPortion(e){
    e.map(dish=>{
      dish.prt = dish.portion[0];
    })

  }
  checkIconActive(arr){
    let s = this;
    let is = false;
    if (!arr) return;
    if (arr.length==0) return;
    arr.map(it=>{
      if(it._id == s.cookie.get('userid') || it == s.cookie.get('userid')){
        is = true;
      }
    });
    if (is) return true;
    else return false;
  }
}
