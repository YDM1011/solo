import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public id:any;
  public editid:any;
  public menu:any = [];
  private key:string = 'menu';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {
    let self = this;
    this.api.onUpDate.subscribe((val:any)=>{
      if(val){
        //console.log(val);
        self[val[1]] = val[0];
      }
    });

    this.id = this.route.snapshot.paramMap.get('id');
    this.editid = this.route.snapshot.paramMap.get('editid');
    //console.log(this.id);
    this.route.params.subscribe((params:any) => {
      self.id = params.id;
      self.editid = params.editid;
      self.initApi(params.id);
    });
    this.initApi(this.id)
  }

  initApi(id){
    let self = this;
    let req=[self.key];
    req.forEach((select)=>{
      this.api.get(self.key,id).then((res:any)=>{
        if(res){
          self[select] = Object.assign([],res);
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
