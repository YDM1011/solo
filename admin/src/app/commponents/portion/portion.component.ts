import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-portion',
  templateUrl: './portion.component.html',
  styleUrls: ['./portion.component.css']
})
export class PortionComponent implements OnInit, OnChanges {

  public portion: any = {
    massa: '',
    name: '',
    about: '',
    price: '',
    dishId: '',
    menuId: ''
  };

  public portV = false;
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

  ngOnChanges(){}
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

  resave(prtn){
    const s = this;
    console.log(prtn);
    s.api.post('portItem/'+prtn._id, prtn).then(res => {
      if (res) {
        s.apiInit();
      }
    });
  }

  delete(elem){
    const s = this;
    console.log(elem);
    s.api.doDel('portItem', elem._id).then(res => {
      console.log(res,"OK");
        s.apiInit();
        console.log(res);
    });
  }

}
