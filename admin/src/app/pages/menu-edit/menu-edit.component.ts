import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.css']
})
export class MenuEditComponent implements OnInit {
  public id: any;
  public editid: any;
  public menu: any;
  public option: any = [];
  public optionCat: any = [];
  public worksTimeView:any;
  public worksTimeViewOnline:any;  
  public myest:any;
  public pid:any;
  public worksTimeAll:any = [];
  private key = 'menu';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {
    const self = this;
    this.id = this.route.snapshot.paramMap.get('id');
    this.editid = this.route.snapshot.paramMap.get('editid');
    //console.log(this.id);
    this.route.params.subscribe((params: any) => {
      self.id = params.id;
      self.editid = params.editid;
      self.initApi(self.id);
    });
  }
  goBack(e){
    if(this.id){
      this.router.navigate(['/menu/'+this.id])
    }else{
      this.router.navigate(['/'])
    }
  }
  initApi(id) {
    const self = this;

    const req = [self.key];
    let isActive = false;
    let isActivecat = false;
    
    req.forEach((select) => {
      
      this.api.get(self.key, id).then((res: any) => {
        
        res.map(item => {
          
          if (item._id == self.editid) {

            self[select] = item;
            this.api.get('category', id).then((cat: any) => {
              if (cat) {
                self.optionCat = [];
                cat.map((categ: any) => {
                  self[select].categories.map((itcat: any) => {
                    if (categ._id == itcat) {

                      isActivecat = true;
                    }
                  });
                  self.optionCat.push({
                    name: categ.maincategory,
                    label: categ.name,
                    id: categ._id,
                    check: isActivecat
                  });
                  isActivecat = false;
                });
              }
            }).catch((err: any) => {});
            
            self.getAllCalendars();
            self.getCalendarActive();
            
            this.api.get('dish', id, 'all').then((val: any) => {
              if (val) {
                self.option = [];
                val.map((it: any) => {

                  self[select].dishes.map((dish: any) => {
                    //console.log(dish, it);
                    if (dish._id == it._id) {

                      isActive = true;
                    }
                  });
                  self.option.push({
                    label: it.name,
                    category: it['dishcategory'],
                    id: it._id,
                    obj: it,
                    check: isActive
                  });
                  isActive = false;
                });
              }

            }).catch((err: any) => {});
          }
        });
      }).catch((err: any) => {});
    });


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

  getCalendar(e){
    const s = this;
    //console.log(e.obj);
    //s.menu.worksTime = e.obj.label || e.obj.name;
    s.menu.deliverytime = e.obj._id;
    s.worksTimeView = e.obj;
  }

  getCalendarOnline(e){
    const s = this;
    //console.log(e.obj);
    //s.menu.worksTime = e.obj.label || e.obj.name;
    s.menu.deliveryonline = e.obj._id;
    s.worksTimeViewOnline = e.obj;
  }

  getCalendarActive(){
    const s = this;
    //console.log(s.menu);
    if(s.menu.deliverytime){
      s.api.justGet(`timeWork/${s.menu.deliverytime._id}`).then((val:any)=>{
        //s.menu.worksTime = val.label || val.name;
        s.worksTimeView = val;
      })
    }
    if(s.menu.deliveryonline){
      s.api.justGet(`timeWork/${s.menu.deliveryonline._id}`).then((val:any)=>{
        //s.menu.worksTime = val.label || val.name;
        s.worksTimeViewOnline = val;
      })
    }
  }

  delingredient(index) {
    const self = this;
    self[self.key].maincategory.splice(index, 1);
  }
  selected(obj) {
    const s = this;
    s[s.key].maincategory[s[s.key].maincategory.length] = {
      name: obj.name,
      label: obj.label,
      id: obj.id
    };
  }
  update(obj) {
    const self = this;
    this.api.set(self.key, obj, self.editid).then((res: any) => {
      if (res) {
        self.api.updateDate(self.key, res, self.id, ).then((val: any) => {
          this.router.navigate([`/${self.key}/${self.id}`]);
        });
      }
    }).catch((err: any) => {});
  }
  getDish(dishes) {
    const s = this;
    s.menu.dishes = [];
    dishes.map(item => {
      s.menu.dishes.push(item.id);
    });
  }
  getCat(cat) {
    const s = this;
    s.menu.categories = [];
    cat.map(item => {
      s.menu.categories.push(item.id);
    });
  }
}
