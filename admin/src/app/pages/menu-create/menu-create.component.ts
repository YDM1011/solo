import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-menu-create',
  templateUrl: './menu-create.component.html',
  styleUrls: ['./menu-create.component.css']
})
export class MenuCreateComponent implements OnInit {
  public menu = {
    name:'',
    delivery:'',
    deliveryfree:'',
    deliverytime:Object,
    deliveryonline:Object,
    deliverymintime:'',
    maxtime:'',
    steptime:'',
    dishes:[],
    categories:[]
  };
  public option:any = [];
  public optionCat: any = [];
  private key:string='menu';
  public id:any;
  public worksTime:any;
  public worksTimeId:any;
  public worksTimeView:any;
  public worksTimeViewOnline:any;
  public worksTimeAll:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {
    let self = this;
    this.id = this.route.snapshot.paramMap.get('id');
    //console.log(this.id);
    this.route.params.subscribe((params:any) => {
      self.id = params.id;
      self.initApi(self.id);
    });
    self.initApi(self.id);
  }
  goBack(e){
    if(this.id){
      this.router.navigate(['/menu/'+this.id])
    }else{
      this.router.navigate(['/'])
    }
  }
  create(obj){
    let self = this;
    obj['estId'] = self.id;
    console.log(obj);
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
      this.api.get('dish',id, 'all').then((res:any)=>{
        if(res){
          self[select] = [];
          res.map((item:any)=>{
            self.option.push({
              label:item.name,
              category: item['dishcategory'],
              id:item._id
            })
          });
          self[select] = self.option;
        }
      }).catch((err:any)=>{});
    });
    this.api.get('category', id).then((cat: any) => {
      if (cat) {
        self.optionCat = [];
        cat.map((categ: any) => {
          self.optionCat.push({
            name: categ.maincategory,
            label: categ.name,
            id: categ._id
          });
        });
      }
    }).catch((err: any) => {});    
    self.getAllCalendars();
  }
  getDish(dishes){
    let s = this;
    dishes.map(item=>{
      s.menu.dishes.push(item.id);
    })
  }
  getCat(cat) {
    const s = this;
    s.menu.categories = [];
    cat.map(item => {
      s.menu.categories.push(item.id);
    });
  }

  getCalendar(e){
    let s = this;
    //console.log(e.obj);
    //s.menu.worksTime = e.obj.label || e.obj.name || "";
    s.menu.deliverytime = e.obj._id;
    s.worksTimeView = e.obj;
  }

  getCalendarOnline(e){
    let s = this;
    //console.log(e.obj);
    //s.menu.worksTime = e.obj.label || e.obj.name;
    s.menu.deliveryonline = e.obj._id;
    s.worksTimeViewOnline = e.obj;
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

}



// name: String,
//   delivery: String,
//   deliveryfree: String,
//   deliverytime: String,
//   deliveryonline: String,
//   deliverymintime: String,
//   maxtime: String,
//   steptime: String,
