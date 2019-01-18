import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {
  public id:any;
  public editid:any;
  public dish:any = [];
  private key:string = 'dish';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api:ApiService
  ) { }

  ngOnInit() {
    let self = this;
    this.api.onUpDate.subscribe((val:any)=>{
      if(val){
        console.log(val);
        self[val[1]] = val[0];
      }
    });

    this.id = this.route.snapshot.paramMap.get('id');
    this.editid = this.route.snapshot.paramMap.get('editid');
    this.route.params.subscribe((params:any) => {
      self.id = params.id;
      self.editid = params.editid;
      self.initApi(params.id);
    });
  }

  initApi(id){
    let self = this;
    let req=['dish'];
    req.forEach((select)=>{
      this.api.get('getDish',id).then((res:any)=>{
        console.log(res);
        if(res){
          self[select] = res;
        }

      }).catch((err:any)=>{});
    });
  }
  delet(id){
    let s = this;
    s.api.delet(s.key,id,s.id).then((res:any)=>{
      if(res){
        s[s.key] = res;
      }
    })
  }
  // dish
}
