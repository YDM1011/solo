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
      self.ests.map(est => {
        const count = JSON.stringify({
          ownerest: est._id,
          $and: [{status: {$ne: 6}}, {status: {$ne: 7}}, {status: {$ne: 0}}]
        });
        this.api.justGet('basketsList', est._id, '', '?count=' + count)
          .then((v: any) => {
            // this.iscount = true;
            if (v) {
              est.countOrder =  v.count;
            }
          },e => console.log(e));
      })
    });

  }

  getCount(id) {

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
