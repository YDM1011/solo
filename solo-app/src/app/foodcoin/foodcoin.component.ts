import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormApiService } from '../lib/form-api/form-api.service';
import {environment} from "../../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {UserService} from "../lib/user/user.service";

@Component({
  selector: 'app-foodcoin',
  templateUrl: './foodcoin.component.html',
  styleUrls: ['./foodcoin.component.css']
})
export class FoodcoinComponent implements OnInit {

  public tab = 1;
  public baskets = [];
  public me;
  public loaded = false;
  public domain: string = environment.apiDomain;
  constructor(
    private user: UserService,
    private http:  HttpClient,
    private api: FormApiService,
    private coockie: CookieService,
  ) { }

  ngOnInit() {
    const query = JSON.stringify({
      status: '6',
      owneruser: this.coockie.get('userid'),
    });
    const populate = JSON.stringify({
      path: 'ownerest estAddressData addressData',
      populate: {path: 'av'},
      select: 'name av subdomain address'
    });
    const sort = JSON.stringify({dataUpdate: -1});
    this.http.get(this.domain + `/api/basketsList?query=${query}&populate=${populate}&sort=${sort}`, this.api.getHeaders())
      .subscribe((baskets: any) => {
        if (baskets) {
          this.baskets = baskets;
          this.parsePrice();
        }
        this.loaded = true;
      });
    this.user.getMe().then(v => {
      if (v) {
        this.me = v;
      }
    });
  }
  parsePrice(){
    this.baskets.map(basket=>{
      basket.boxesPrice = basket['editByAdmin'] ? basket['editByAdmin']['boxesPrice'] || basket.boxesPrice : basket.boxesPrice || 0;
      basket.totalPrice = basket['editByAdmin'] ? basket['editByAdmin']['totalPrice'] || basket.totalPrice : basket.totalPrice;
      basket.deliveryPrice = basket['editByAdmin'] ? basket['editByAdmin']['deliveryPrice'] || basket.deliveryPrice : basket.deliveryPrice || 0;
    })
  }

}
