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
      path: 'ownerest',
      populate: {path: 'av'},
      select: 'name av subdomain'
    });
    this.http.get(this.domain + `/api/basketsList?query=${query}&populate=${populate}`, this.api.getHeaders())
      .subscribe((baskets: any) => {
        if (baskets) {
          this.baskets = baskets;
        }
        this.loaded = true;
      });
    this.user.getMe().then(v => {
      if (v) {
        this.me = v;
      }
    });
  }

}
