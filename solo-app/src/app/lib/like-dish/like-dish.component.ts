import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormApiService} from "../form-api/form-api.service";

@Component({
  selector: 'app-like-dish',
  templateUrl: './like-dish.component.html',
  styleUrls: ['./like-dish.component.css']
})
export class LikeDishComponent implements OnInit, OnChanges {
  public host: string = environment.apiDomain.split('//')[1];
  public domain: string = environment.apiDomain;
  @Input() id;
  public dishes;
  constructor(
    private route: ActivatedRoute,
    private http:  HttpClient,
    private api: FormApiService
  ) { }

  ngOnInit() {
    let s = this;
    if(s.id)
    s.initApi()
  }
  ngOnChanges(){
    let s = this;
    if(s.id)
    s.initApi()
  }
  initApi(){
    let s = this;
    s.http.get(s.domain + '/api/getLikeDish/' + s.id, s.api.getHeaders())
      .subscribe((dishes: any) => {
        s.dishes = (dishes);
      });
  }
}
