import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-complement-edit',
  templateUrl: './complement-edit.component.html',
  styleUrls: ['./complement-edit.component.css']
})
export class ComplementEditComponent implements OnInit {
  public id:any;
  public editid:any;
  public complement:any;
  public option:any = [];
  private key:string='complement';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {

    let self = this;
    this.id = this.route.snapshot.paramMap.get('id');
    this.editid = this.route.snapshot.paramMap.get('editid');
    console.log(this.id);
    this.route.params.subscribe((params:any) => {
      self.id = params.id;
      self.editid = params.editid;
      self.initApi(self.id)
    });

  }
  goBack(e){
    if(this.id){
      this.router.navigate(['/complement/'+this.id])
    }else{
      this.router.navigate(['/'])
    }
  }
  initApi(id){
    let self = this;
    let req=[self.key];
    req.forEach((select)=>{
      this.api.get(self.key,id).then((res:any)=>{
        res.map(item=>{
          if (item._id == self.editid){
            self[select] = Object.assign({},item);;
          }
        });
      }).catch((err:any)=>{});
    });
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
  delingredient(index){
    let self = this;
    self[self.key].maincategory.splice(index, 1)
  }
  selected(obj){
    let s = this;
    s[s.key].maincategory ={
      name:obj.name,
      label:obj.label,
      id:obj.id
    };
  }
  update(obj){
    let self = this;
    this.api.set(self.key,obj,self.editid).then((res:any)=>{
      if(res){
        self.api.updateDate(self.key,res,self.id,).then((val:any)=>{
          this.router.navigate([`/${self.key}/${self.id}`]);
        });
      }
    }).catch((err:any)=>{});
  }
}
