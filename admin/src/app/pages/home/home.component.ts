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
    this.api.get('get_est').then((res: any) => {
      self.ests = res;
      this.id = res[0]._id;

      this.data$ = this.api.get('overview', this.id);
      this.yesterday.setDate(this.yesterday.getDate() - 1);
    });
    
  }

}
