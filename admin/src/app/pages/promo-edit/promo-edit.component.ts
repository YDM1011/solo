import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-promo-edit',
  templateUrl: './promo-edit.component.html',
  styleUrls: ['./promo-edit.component.css']
})
export class PromoEditComponent implements OnInit {
  public id:any;
  public editid:any;
  public promo:any;
  public option:any = [];
  private key:string = 'promo';
  
  public worksTime:any;
  public worksTimeView:any;
  public worksTimeAll:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {

    let self = this;
    this.id = this.route.snapshot.paramMap.get('id');
    this.editid = this.route.snapshot.paramMap.get('editid');
    this.route.params.subscribe((params:any) => {
      self.id = params.id;
      self.editid = params.editid;
      self.initApi(self.id)
    });
  }

  goBack(e){
    if(this.id){
      this.router.navigate(['/promo/'+this.id])
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
            self[select] = Object.assign({},item);
          }
        });
        
      self.getCalendarActive();
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
    self.getAllCalendars();
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
    this.api.set(self.key,obj,self.editid).then((res:any)=>{
      if(res){
        self.api.updateDate(self.key,res,self.id,).then((val:any)=>{
          this.router.navigate([`/${self.key}/${self.id}`]);
        });
      }
    }).catch((err:any)=>{});
  }

  getCalendar(e){
    let s = this;
    s.worksTime = e.obj.label || e.obj.name || "";
    s.promo.grafic = e.obj._id;
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
  }

  getCalendarActive(){
    const s = this;
    if(s.promo.grafic){
      s.api.justGet(`timeWork/${s.promo.grafic._id}`).then((val:any)=>{
        s.promo.worksTime = val.label || val.name;
        s.worksTimeView = val;
      })
    }
  }

}
