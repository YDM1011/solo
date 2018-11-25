import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.css']
})
export class MenuEditComponent implements OnInit {
  public id:any;
  public editid:any;
  public menu:any;
  public option:any = [];
  public optionCat:any = [];
  private key:string='menu';
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
  initApi(id){
    let self = this;
    let req=[self.key];
    let isActive = false;
    let isActivecat = false;
    req.forEach((select)=>{
      this.api.get(self.key,id).then((res:any)=>{
        res.map(item=>{

          if (item._id == self.editid){

            self[select] = item;
            this.api.get('category',id).then((cat:any)=>{
              if(cat){
                self.optionCat = [];
                cat.map((categ:any)=>{
                  self[select].categories.map((itcat:any)=>{
                    if (categ._id == itcat){

                      isActivecat = true;
                    }
                  });
                  self.optionCat.push({
                    name:categ.maincategory,
                    label:categ.name,
                    id:categ._id,
                    check: isActivecat
                  })
                  isActivecat = false;
                });
              }
            }).catch((err:any)=>{});

            this.api.get('dish',id, 'all').then((val:any)=>{
              if(val){
                self.option = [];
                val.map((it:any)=>{

                  self[select].dishes.map((dish:any)=>{
                    console.log(dish, it);
                    if (dish._id == it._id){

                      isActive = true;
                    }
                  });
                  self.option.push({
                    label:it.name,
                    category: it['dishcategory'],
                    id:it._id,
                    check: isActive
                  });
                  isActive = false;
                })
              }

            }).catch((err:any)=>{});
          }
        });
      }).catch((err:any)=>{});
    });


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
  update(obj){
    let self = this;
    console.log(self.key);
    this.api.set(self.key,obj,self.editid).then((res:any)=>{
      if(res){
        self.api.updateDate(self.key,res,self.id,).then((val:any)=>{
          this.router.navigate([`/${self.key}/${self.id}`]);
        });
      }
    }).catch((err:any)=>{});
  }
  getDish(dishes){
    let s = this;
    s.menu.dishes = [];
    dishes.map(item=>{
      s.menu.dishes.push(item.id);
    });
  }
  getCat(cat){
    let s = this;
    s.menu.categories = [];
    cat.map(item=>{
      s.menu.categories.push(item.id);
    })
  }
}
