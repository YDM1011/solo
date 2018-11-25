import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../api.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dish-create',
  templateUrl: './dish-create.component.html',
  styleUrls: ['./dish-create.component.css']
})
export class DishCreateComponent implements OnInit {
  public btnBG:string='<span class="btn">Завантажити фон</span>';
  public setArg:string='';
  public option:any=[];
  public isFormAdd:boolean=false;
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
    dishcategory:'',
    dishingredient:[],
    ingredientis:[],
    isnew:true,
    ishit:true,
    isdelivery:true,
    pic:{},
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
}
