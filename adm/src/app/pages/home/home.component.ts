import {Component, OnInit } from '@angular/core';
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public id;
  data$: any
  public routeActive = [];
  public triger;
  yesterday = new Date()
  public est: any;
  public ests: any;
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {     
    this.getEstablishment();  
  }

  getEstablishment() {
    const self = this;
    this.data$ = this.api.get('overviewAll');
    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }

}