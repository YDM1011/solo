import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public routeActive = [];
  public triger;

  public ests: any = [];
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
    });

  }

  checkRouter(key){
    const s = this;
    if (!s.routeActive[key]){
      s.triger ? s.routeActive[s.triger] = false : '';
      s.routeActive[key] = !s.routeActive[key];
      s.triger = key;
    } else {
      s.triger = null;
      s.routeActive[key] = false;
    }


  }
}
