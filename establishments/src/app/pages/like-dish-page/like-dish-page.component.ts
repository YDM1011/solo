import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-like-dish-page',
  templateUrl: './like-dish-page.component.html',
  styleUrls: ['./like-dish-page.component.css']
})
export class LikeDishPageComponent implements OnInit {

  public photos;
  public id;
  constructor(
    private api: ApiService,
    private cookie : CookieService
  ) { }

  ngOnInit() {
    this.id = this.cookie.get('userid');
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
