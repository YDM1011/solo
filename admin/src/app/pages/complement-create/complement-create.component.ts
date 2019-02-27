import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-complement-create',
  templateUrl: './complement-create.component.html',
  styleUrls: ['./complement-create.component.css']
})
export class ComplementCreateComponent implements OnInit {
  public complement = {
    name:'',
    massa:'',
    energy:'',
    price:'',
    maincategory:''
  };
  public option:any = [];
  private key:string='complement';
  public id:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {
    let self = this;
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.route.params.subscribe((params:any) => {
      self.id = params.id;
      self.initApi(self.id);
    });
  }
  goBack(e){
    if(this.id){
      this.router.navigate(['/complement/'+this.id])
    }else{
      this.router.navigate(['/'])
    }
  }
  create(obj){
    let self = this;
    obj['estId'] = self.id;
    this.api.create(self.key,obj,self.id).then((res:any)=>{
      if(res){
        self.api.createDate(self.key,res,self.id).then((val:any)=>{
          this.router.navigate([`/${self.key}/${self.id}`]);
        });
      }
    }).catch((err:any)=>{});
  }
  delingredient(index){
    let self = this;
    self[self.key].maincategory.splice(index, 1)
  }

  initApi(id){
    let self = this;
    let req=['option'];
    req.forEach((select)=>{
      this.api.get('category',id).then((res:any)=>{
        if(res){
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
}
// name: String,
//   maincategory: [maincategoryschema],
//   massa: String,
//   energy: String,
//   price: String,
//   owneruser: String,
//   ownerest: String,
