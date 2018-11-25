import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public id:any;
  public editid:any;
  public category:any = [];
  private key:string = 'category';
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
    console.log(this.id);
    this.route.params.subscribe((params:any) => {
      self.id = params.id;
      self.editid = params.editid;
      self.initApi(params.id);
    });

  }

  initApi(id){
    let self = this;
    let req=[self.key];
    req.forEach((select)=>{
      this.api.get(self.key,id).then((res:any)=>{
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
}
