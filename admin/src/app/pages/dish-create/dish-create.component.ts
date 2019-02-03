import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../api.service";
import {Router, ActivatedRoute} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-dish-create',
  templateUrl: './dish-create.component.html',
  styleUrls: ['./dish-create.component.css']
})
export class DishCreateComponent implements OnInit {
  public btnBG:string='<span class="btn btn-sm btn-primary"><strong>Завантажити фон</strong></span>';
  public setArg:string='';
  public option:any=[];
  public isFormAdd:boolean=false;
  public complements: any = [];
  public complementsM: any = [];
  public complementsOpt: any = [];
  public complementsOptM: any = [];
  public apiDomain:any = environment.apiDomain;
  public portion:any={
    massa:'',
    name:'',
    about:'',
    price:''
  };
  public dish = {
    name:'',
    category:'',
    portion:[],
    about:'',
    dishcategory:null,
    dishingredient:[],
    ingredientis:[],
    isnew:true,
    isActia:false,
    ishit:true,
    isdelivery:true,
    pic:null,
    estId:''
  };

  public id:any;
  public dishes:any = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api:ApiService
  ) { }

  ngOnInit() {
    let self = this;
    this.id = this.route.snapshot.paramMap.get('id');
    // self.initApi(self.id);
    console.log(this.id);
    this.route.params.subscribe((params:any) => {
      self.id = params.id;
      self. initApi(self.id);
    });
  }
  initApi(id){
    let self = this;
    let req1=['option'];
    req1.forEach((select)=>{
      this.api.get('category',id).then((res:any)=>{
        if(res){
          self[select] = [];
          res.map((item:any)=>{
            self.option.push({
              name:item.maincategory,
              label:item.name,
              id:item._id
            })
          });
          self[select] = self.option;
        }
      }).catch((err:any)=>{});
    });
    self.getComp();
  }

  check(){
    let self = this;
    console.log(self.setArg[self.setArg.length-1]);
    if (self.setArg[self.setArg.length-1] == ','){
      self.dish.dishingredient.push(self.setArg.split(',')[0]);
      return self.setArg = null;
    }
  }
  create(obj){
    let self = this;
    obj['estId'] = self.id;
    this.api.create('dish',obj,self.id).then((res:any)=>{
      if(res){
        self.api.createDate('dish',res,self.id).then((val:any)=>{
          this.router.navigate(['/dish/'+self.id]);
        });
      }
    }).catch((err:any)=>{});
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
  getImg(e){
    console.log(e.result._id);
    this.dish.pic = e.result._id;
  }
}
