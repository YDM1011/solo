import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../api.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  public id:any;
  public editid:any;
  public category:any;
  public option:any = [];
  private key:string ='category';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api:ApiService
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
  initApi(id){
    let self = this;
    let req=['category'];
    req.forEach((select)=>{
      this.api.get('category',id).then((res:any)=>{

        res.map(item=>{
          if (item._id == self.editid){
            self[select] = Object.assign({},item);
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
  update(obj){
    let self = this;
    this.api.set('category',obj,self.editid).then((res:any)=>{
      if(res){
        self.api.updateDate('category',res,self.id,).then((val:any)=>{
          this.router.navigate(['/category/'+self.id]);
        });
      }
    }).catch((err:any)=>{});
  }
  delingredient(index){
    let self = this;
    self[self.key].maincategory.splice(index, 1)
  }
  selected(obj){
    let s = this;
    s[s.key].maincategory[s[s.key].maincategory.length]={
      name:obj.name,
      label:obj.label,
      id:obj.id
    };
  }
}
