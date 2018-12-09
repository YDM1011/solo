import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-portion',
  templateUrl: './portion.component.html',
  styleUrls: ['./portion.component.css']
})
export class PortionComponent implements OnInit {

  public portion: any = {
    massa: '',
    name: '',
    about: '',
    price: '',
    dishId: '',
    menuId: ''
  };

  public portions: any = [];

  @Input() obj: any = {};
  @Input() menuId: any;

  public isFormAdd = false;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.apiInit();
  }

  apiInit() {
    const s = this;
    console.log(s.obj._id, s.menuId);
    const query = {
      menuId: s.menuId,
      dishId: s.obj._id,
    };
    s.api.get('portItem', '', '-__v', query).then(res => {
      s.portions = res;
    });
  }

  addPortion() {
    const s = this;
    s.obj.portion[s.obj.portion.length] = s.portion;
    s.isFormAdd = false;
    s.portion.dishId = this.obj._id;
    s.portion.menuId = this.menuId;
    console.log(s.portion);
    s.api.post('portItem', s.portion).then(res => {
      if (res) {
        s.apiInit();
      }
    });
  }

}
