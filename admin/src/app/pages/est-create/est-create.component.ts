import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-est-create',
  templateUrl: './est-create.component.html',
  styleUrls: ['./est-create.component.css']
})
export class EstCreateComponent implements OnInit {

  public id:any;
  public name:any;
  public menu:any;
  public menus:any = [];
  public MCI:any = [];
  public option:any = [];
  public mobile:any;
  public about:any;
  public mail:any;
  public address:any;
  public coordinates:any = [50.7464, 25.3262];
  public worksTime:any;
  public worksTimeId:any;
  public worksTimeView:any;
  public worksTimeAll:any;
  public status:boolean=true;
  public delivery:boolean=false;
  public getself:boolean=false;
  public reservation:boolean=false;z
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api:ApiService
  ) { }

  ngOnInit() {
    let self = this;
    this.id = this.route.snapshot.paramMap.get('id');
    // self.initApi(self.id);
    console.log(this.id);
    this.route.params.subscribe((params:any) => {
      self.id = params.id;
      console.log(params);
      self.initApi(params.id);
    });
  }
  goBack(e){
    if(this.id){
      this.router.navigate(['/establishments/'+this.id])
    }else{
      this.router.navigate(['/'])
    }
  }
  initApi(id){
    let self = this;
    let req=['mobile','about','mail',
      'delivery','getself','reservation','worksTimeId'];
    req.forEach((select)=>{
      this.api.get('establishment',id,select).then((res:any)=>{
        self[select] = res[select];
      }).catch((err:any)=>{});
    });

    let req1=['option'];
    req1.forEach((select)=>{
      this.api.get('menu',self.id).then((res:any)=>{
        if(res){
          self[select] = [];
          res.map((item:any)=>{
            self.option.push({
              name:item.name,
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
  update(obj,model){
    let self = this;
    try{if (self[model]['_id']){obj['params']=self[model]['_id']}}catch(err){}
    this.api.set('oneest',obj,self.id,model).then((res:any)=>{
      self[model] = res[model];
    }).catch((err:any)=>{});
  }
  create(obj,model){
    let self = this;
    this.api.create('oneest',obj,self.id,model).then((res:any)=>{
      if(res){
        self.api.createDate('establishment',res[model],self.id,model).then((val:any)=>{
          this.router.navigate(['/establishments/'+self.id]);
        });
      }
    }).catch((err:any)=>{});
  }
  getDish(dishes){
    let s = this;
    s.menus = [];
    dishes.map(item=>{
      s.menus.push(item.name);
      s.MCI.push(item.id);
    })
  }
  getCalendar(e){
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
  }
}
