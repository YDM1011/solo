import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../api.service';
import {environment} from "../../../environments/environment";

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
  public complements: any = [];
  public complementsM: any = [];
  public complementsOpt: any = [];
  public complementsOptM: any = [];
  public isFormAdd = false;
  public defdishcategory = 'Обрати категорію';
  public apiDomain:any = environment.apiDomain;
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
  goBack(e){
    if(this.id){
      this.router.navigate(['/dish/'+this.id])
    }else{
      this.router.navigate(['/'])
    }
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
            self.getComp()
          }
        });
        this.api.get('category', id).then((res: any) => {
          if (res) {
            self.option = [];
            res.map((item: any) => {
              if (item._id == self.dish.dishcategory){
                if (item._id == self.dish.dishcategory._id){
                  self.defdishcategory = item.name
                }
              }
              self.option.push({
                name: item.maincategory,
                label: item.name,
                id: item._id,
                isActive: false
              });

            });

          }
        }).catch((err: any) => {});
      }).catch((err: any) => {});
    });

    this.api.get('complement', id).then((res: any) => {
      if (res) {
        self.DCoption = [];
        res.map((item: any) => {
          self.DCoption.push({
            name: item.maincategory,
            label: item.name,
            id: item._id
          });
        });
      }
    }).catch((err: any) => {});
  }

  getComp(){
    let self = this;
    this.api.get('checkBox').then((res: any) => {
      if (res) {
        self.complementsOpt = [];
        self.complements = [];
        res.map((item: any) => {
          self.complementsOpt.push({
            check: false,
            label: item.name,
            id: item._id
          });
        });
        res.map((item: any) => {
          self.complements.push({
            check: false,
            label: item.name,
            id: item._id
          });
        });
      }
      self.ComMap()
    }).catch((err: any) => {});
  }

  ComMap(){
    let self = this;
    self.dish.dishingredient.map(ing=>{
      self.complements.map(it=>{
        if(ing == it.id){
          it.check = true;
          self.complementsM.push(it.label);
        }
      })
    });
    self.dish.ingredientis.map(ing=>{
      self.complementsOpt.map(it=>{
        if(ing == it.id){
          it.check = true;
          self.complementsOptM.push(it.label);
        }
      })
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

  checkCom(e){
    let s = this;
    console.log(e);
    s.dish.dishingredient=[];
    s.complementsM=[];
    e.map(el=>{
      s.dish.dishingredient.push(el.id);
    });
    s.ComMap();
  }
  checkComOpt(e){
    let s = this;
    console.log(e);
    s.dish.ingredientis=[];
    s.complementsOptM=[];
    e.map(el=>{
      s.dish.ingredientis.push(el.id);
    });
    s.ComMap();
  }
  getImg(e){
    console.log(e.result._id);
    this.dish.pic = e.result;
  }
}
