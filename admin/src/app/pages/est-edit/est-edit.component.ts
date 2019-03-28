import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-est-edit',
  templateUrl: './est-edit.component.html',
  styleUrls: ['./est-edit.component.css']
})
export class EstEditComponent implements OnInit,OnChanges {

  public id:any;
  public pid:any;
  public myest:any;
  public option:any = [];
  public option2:any = [];
  public menus:any = [];
  public afterSelect:any = [];
  public labels:any;
  public worksTimeAll:any;
  public worksTimeView:any;
  public labelInUse:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api:ApiService
  ) { }

  ngOnInit() {
    let self = this;
    this.id = this.route.snapshot.paramMap.get('id');
    this.pid = this.route.snapshot.paramMap.get('pid');
    // self.initApi(self.id);
    console.log(this.id);
    this.route.params.subscribe((params:any) => {
      self.id = params.id;
      self.pid = params.pid;
      console.log(params);
      self.initApi(params.id);
    });
  }
  ngOnChanges(){}

  goBack(e){
    if(this.id){
      this.router.navigate(['/establishments/'+this.pid])
    }else{
      this.router.navigate(['/'])
    }
    this.initApi(this.id);
  }
  initApi(id){
    let self = this;
    let req=['myest'];
    self.getAllCalendars();

    req.forEach((select)=>{
      this.api.get('oneest',id,select).then((res:any)=>{
        self[select] = res;
        self[select].coordinates = res.coordinates ? res.coordinates : [50.7464, 25.3262];
        self.menus=[];
        self[select].menus.map(item=>{
          self.menus.push(item.name);
        });
        self.checkLabel();
        self.getCalendarActive();
      }).catch((err:any)=>{});
    });
    let req1=['option'];
    req1.forEach((select)=>{
      this.api.get('menu',self.pid).then((res:any)=>{
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

  }
  update(obj,model){
    let self = this;
    let elem = {};
    this.api.set('oneest',obj,self.id,model).then((res:any)=>{
      if(res){
        elem[model]=res;
        self.menus = [];
        res.menus.map(item=>{
          if (item)
            self.menus.push(item.name);
        });
        // self.api.updateDate('oneest',elem[model],self.id,model).then((val:any)=>{});
        self.api.updateDate('establishment',elem[model],self.pid,model).then((val:any)=>{
          this.router.navigate(['/establishments/'+self.pid]);
        });
      }
    }).catch((err:any)=>{});
  }
  create(obj,model){
    let self = this;
    this.api.create('oneest',obj,self.id,model).then((res:any)=>{
      if(res){
        self.api.updateDate('establishment',res[model],self.id,model).then((val:any)=>{
          this.router.navigate(['/establishments/'+self.id]);
        });
      }
    }).catch((err:any)=>{});
  }
  getDish(dishes){
    let s = this;
    s.myest.menus = [];
    s.menus = [];
    dishes.map(item=>{
      s.myest.menus.push(item.id);
      s.menus.push(item.name);
    })
  }
  getLabel(item){
    let s = this;
    s.afterSelect = item;
    s.labelInUse = [];
    item.map(it=>{
      it.check = true;
      s.labelInUse.push(it.id);
    })
  }
  getAllCalendars(){
    const s = this;
    s.api.justGet(`timeWork?query={"ownerEst":"${s.pid}"}`).then((val:any)=>{
      s.worksTimeAll = [];
      val.map(it=>{
        s.worksTimeAll.push({
          label: it.name,
          obj: it
        })
      });
    })
  }
  checkLabel(){
    let self = this;
    let req2=['option2'];
    self.option2=[];
    req2.forEach((select)=>{
      this.api.get('label').then((res:any)=>{
        if(res){
          self.labels = res;
          self[select] = [];

          res.map((item:any)=>{
            if (self.myest.labelInUse){
              if (self.myest.labelInUse.length > 0){
                self.myest.labelInUse.some(actIt=>{

                  if (actIt._id == item._id){
                    return self.option2.push({
                      name:item.name,
                      label:item.name,
                      id:item._id,
                      check: true
                    })
                  }else{
                    if (actIt._id == self.myest.labelInUse[self.myest.labelInUse.length-1]._id)
                    self.option2.push({
                      name:item.name,
                      label:item.name,
                      id:item._id
                    })
                    if (self.myest.labelInUse.length-1 < 0)
                    self.option2.push({
                      name:item.name,
                      label:item.name,
                      id:item._id
                    })
                  }
                })

              }else{
                self.option2.push({
                  name:item.name,
                  label:item.name,
                  id:item._id
                })
              }
            }else{
              self.option2.push({
                name:item.name,
                label:item.name,
                id:item._id
              })
            }

          });
          console.log("test", self.option2);
          self[select] = self.option2;
        }
      }).catch((err:any)=>{});
    });
  }
  getCalendar(e){
    let s = this;
    console.log(e.obj);
    s.myest.worksTime = e.obj.label || e.obj.name;
    s.myest.worksTimeId = e.obj._id;
    s.worksTimeView = e.obj;
  }
  getCalendarActive(){
    const s = this;
    console.log(s.myest);
    if(s.myest.worksTimeId){
      s.api.justGet(`timeWork/${s.myest.worksTimeId}`).then((val:any)=>{
        s.myest.worksTime = val.label || val.name;
        s.worksTimeView = val;
      })
    }
  }
}
