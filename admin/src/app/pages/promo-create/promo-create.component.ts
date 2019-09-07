import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-promo-create',
  templateUrl: './promo-create.component.html',
  styleUrls: ['./promo-create.component.css']
})
export class PromoCreateComponent implements OnInit {
  public promo = {
    name:'',
    discount:'',
    maincategory:[]
  };  
  public option:any = [];
  private key:string='promo';
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
      this.router.navigate(['/promo/'+this.id])
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
    /*self.getAllCalendars();*/
  }

  /*getCalendar(e){
    let s = this;
    console.log(e.obj);
    s.worksTime = e.obj.label || e.obj.name || "";
    s.worksTimeId = e.obj._id;
    s.worksTimeView = e.obj;
  }

  getAllCalendars(){
    const s = this;
    s.api.justGet(`timeWork?query={"ownerEst":"${s.id}"}`).then((val:any)=>{
      s.worksTimeAll = [];
      val.map(it=>{
        s.worksTimeAll.push({
          label: it.name,
          obj: it
        })
      });
    })
  }*/

}
