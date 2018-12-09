import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-dish-edit',
  templateUrl: './dish-edit.component.html',
  styleUrls: ['./dish-edit.component.css']
})
export class DishEditComponent implements OnInit {
  public id: any;
  public editid: any;
  public dish: any;
  public setArg: any;
  public setArg2: any;
  public option: any = [];
  public DCoption: any = [];
  public isFormAdd = false;
  public portion: any = {
    massa: '',
    name: '',
    about: '',
    price: ''
  };
  public btnBG = '<span class="btn">Завантажити фон</span>';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {

    const self = this;
    this.id = this.route.snapshot.paramMap.get('id');
    this.editid = this.route.snapshot.paramMap.get('editid');
    // self.initApi(self.id);
    console.log(this.id);
    this.route.params.subscribe((params: any) => {
      self.id = params.id;
      self.editid = params.editid;
      self.initApi(self.id);
    });

  }
  initApi(id) {
    const self = this;
    const req = ['dish'];
    req.forEach((select) => {
      this.api.get('dish', id).then((res: any) => {
        res.map(item => {
          if (item._id == self.editid) {
            self[select] = item;
            self.api.onImg.subscribe((pic: any) => {
              if (pic) {
              if (pic._id == self.dish.pic._id) {
                self.dish.pic = pic;
              }
              }
            });
          }
        });
      }).catch((err: any) => {});
    });
    const req1 = ['option'];
    req1.forEach((select) => {
      this.api.get('category', id).then((res: any) => {
        if (res) {
          self[select] = [];
          res.map((item: any) => {
            self.option.push({
              name: item.maincategory,
              label: item.name,
              id: item._id
            });
          });
          self[select] = self.option;
        }
      }).catch((err: any) => {});
    });
    const req2 = ['DCoption'];
    req2.forEach((select) => {
      this.api.get('complement', id).then((res: any) => {
        if (res) {
          self[select] = [];
          res.map((item: any) => {
            self.option.push({
              name: item.maincategory,
              label: item.name,
              id: item._id
            });
          });
          self[select] = self.option;
        }
      }).catch((err: any) => {});
    });
  }
  update(obj) {
    const self = this;
    this.api.set('dish', obj, self.editid).then((res: any) => {
      if (res) {
        // self.api.updateDate('oneest',elem[model],self.id,model).then((val:any)=>{});
        console.log(res);
        self.api.updateDate('dish', res, self.id, ).then((val: any) => {
          this.router.navigate(['/dish/' + self.id]);
        });
      }
    }).catch((err: any) => {});
  }
  check() {
    const self = this;
    if (self.setArg[self.setArg.length - 1] == ',') {
      self.dish.dishingredient.push(self.setArg.split(',')[0]);
      return self.setArg = null;
    }
  }
  check2() {
    const self = this;
    if (self.setArg2[self.setArg2.length - 1] == ',') {
      self.dish.ingredientis.push({name: self.setArg2.split(',')[0], check: true});
      return self.setArg2 = null;
    }
  }
  delingredient(index) {
    const self = this;
    self.dish.dishingredient.splice(index, 1);
  }
  delingredient2(index) {
    const self = this;
    self.dish.ingredientis.splice(index, 1);
  }
  selected(obj) {
    this.dish.dishcategory = {
      _id: obj.id,
      name: obj.label
    };
  }
}
