import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-est-edit',
  templateUrl: './est-edit.component.html',
  styleUrls: ['./est-edit.component.css']
})
export class EstEditComponent implements OnInit {

  public id:any;
  public pid:any;
  public myest:any;
  public option:any = [];
  public menus:any = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api:ApiService
  ) { }

  ngOnInit() {
    let self = this;
    this.id = this.route.snapshot.paramMap.get('id');
    this.pid = this.route.snapshot.paramMap.get('pid');
    // self.initApi(self.id);
    console.log(this.id);
    this.route.params.subscribe((params:any) => {
      self.id = params.id;
      self.pid = params.pid;
      console.log(params);
      self.initApi(params.id);
    });
  }

  initApi(id){
    let self = this;
    let req=['myest'];
    req.forEach((select)=>{
      this.api.get('oneest',id,select).then((res:any)=>{
        self[select] = res;
        self.menus=[];
        console.log("test",self[select]);
        self[select].menus.map(item=>{
          console.log("test",item);
          self.menus.push(item.name);
        })
      }).catch((err:any)=>{});
    });
    let req1=['option'];
    req1.forEach((select)=>{
      this.api.get('menu',self.pid).then((res:any)=>{
        if(res){
          self[select] = [];
          res.map((item:any)=>{
            self.option.push({
              name:item.name,
              label:item.name,
              id:item._id
            })
          });
          self[select] = self.option;
        }
      }).catch((err:any)=>{});
    });
  }
  update(obj,model){
    let self = this;
    let elem = {};
    this.api.set('oneest',obj,self.id,model).then((res:any)=>{
      if(res){
        elem[model]=res;
        self.menus = [];
        res.menus.map(item=>{
          if (item)
            self.menus.push(item.name);
        });
        // self.api.updateDate('oneest',elem[model],self.id,model).then((val:any)=>{});
        self.api.updateDate('establishment',elem[model],self.pid,model).then((val:any)=>{
          this.router.navigate(['/establishments/'+self.pid]);
        });
      }
    }).catch((err:any)=>{});
  }
  create(obj,model){
    let self = this;
    this.api.create('oneest',obj,self.id,model).then((res:any)=>{
      if(res){
        self.api.updateDate('establishment',res[model],self.id,model).then((val:any)=>{
          this.router.navigate(['/establishments/'+self.id]);
        });
      }
    }).catch((err:any)=>{});
  }
  getDish(dishes){
    let s = this;
    s.myest.menus = [];
    s.menus = [];
    dishes.map(item=>{
      s.myest.menus.push(item.id);
      s.menus.push(item.name);
    })
  }
}