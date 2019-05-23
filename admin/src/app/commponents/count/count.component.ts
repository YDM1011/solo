import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../api.service";
import {order} from "../../pages/order/order-min";

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent implements OnInit {

  public count;
  public iscount = false;
  @Input() orderType;
  @Input() id;

  constructor( private api: ApiService) { }

  ngOnInit() {
    const count = JSON.stringify({status: 1, orderType: this.orderType, ownerest: this.id});
    this.api.justGet('basketsList', this.id, '', '?count=' + count)
      .then((v: any) => {
        this.iscount = true;
        if (v) {
          this.count = v.count;
        }
      });
  }

}