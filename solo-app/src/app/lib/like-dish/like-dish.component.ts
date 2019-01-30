import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormApiService} from "../form-api/form-api.service";

@Component({
  selector: 'app-like-dish',
  templateUrl: './like-dish.component.html',
  styleUrls: ['./like-dish.component.css']
})
export class LikeDishComponent implements OnInit {
  public host: string = environment.apiDomain.split('//')[1];
  public domain: string = environment.apiDomain;
  public id;
  public dishes;
  constructor(
    private route: ActivatedRoute,
    private http:  HttpClient,
    private api: FormApiService
  ) { }

  ngOnInit() {
    let s = this;
    s.id = s.route.snapshot.paramMap.get('id');
    this.route.params.subscribe((params: any) => {
      this.id = this.route.snapshot.paramMap.get('id');
      s.initApi()
    });

  }
  initApi(){
    let s = this;
    s.http.get(s.domain + '/api/getLikeDish/' + s.id, s.api.getHeaders())
      .subscribe((dishes: any) => {
        s.dishes = (dishes);
      });
  }
}
