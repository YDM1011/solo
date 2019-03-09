import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  public id:any;
  public editid:any;
  public box:any = [];
  private key:string = 'box';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {
    let self = this;
    this.api.onUpDate.subscribe((val:any)=>{
      if(val){
        self[val[1]] = [val[0], ...self[val[1]]];
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
