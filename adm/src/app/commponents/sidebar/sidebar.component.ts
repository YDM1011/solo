import { Component, Input, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public order;

  public ests: any = [];
  @Input() id;
  constructor(    
    private api: ApiService
  ) { }

  ngOnInit() {
    this.getBasket();
  }

  getBasket() {
    const self = this;
    const count = JSON.stringify({
      $and: [{status: {$ne: 6}}, {status: {$ne: 7}}, {status: {$ne: 0}}]
    });

    this.api.justGet('basketsList', '', '', '?count=' + count)
      .then((v: any) => {
        // this.iscount = true;
        if (v) {
          self.ests.countOrder =  v.count;
        }
      },e => console.log(e));
    }    

}
