import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FormApiService} from '../lib/form-api/form-api.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  public domain: string = environment.apiDomain;
  public baskets;

  constructor(
    private http:  HttpClient,
    private api: FormApiService
  ) { }

  ngOnInit() {
    const s = this;
    this.http.get(this.domain + '/api/basket_user', this.api.getHeaders())
      .subscribe((products: any) => {
       if (products) {
         console.log(products);
         s.baskets = products;
       }
      });
  }

}
