import {Component, OnInit, OnChanges} from '@angular/core';
import {ApiService} from "../../api.service";
import {ActivatedRoute} from "@angular/router";
import {Links} from "./links";

@Component({
  selector: 'app-chain',
  templateUrl: './chain.component.html',
  styleUrls: ['./chain.component.css']
})
export class ChainComponent implements OnInit, OnChanges {
  public link = {url:'',label:''};
  public isFormAdd:boolean = false;
  public delivery:boolean = false;
  public getself:boolean = false;
  public reservation:boolean = false;
  public result;
  public btnBG:string='<span class="btn btn-sm btn-primary pull-left"><strong>Завантажити</strong></span>';
  public bg:any={};
  public av:any={};
  public name:any;
  public mail:any;
  public subdomain:any;
  public mobile:any;
  public about:any;
  public id:any;
  public worksTime:any;
  public worksTimeView:any;
  public worksTimeAll:any;
  public minPrice:number;
  public links:any=new Links();
  public linksFormat:any=[0,1,2,3,4];
  constructor(
    private route: ActivatedRoute,
    private api:ApiService
  ) { }

  ngOnInit() {
    let self = this;
    this.id = this.route.snapshot.paramMap.get('id');
    // self.initApi(self.id);

    this.route.params.subscribe((params:any) => {
      self.id = params.id;
      self.initApi(params.id);
      console.log("reinit");
    });
    self.getAllCalendars()
    // this.initApi();
  }
  ngOnChanges() {

  }
  initApi(id){
    let self = this;
    let req=['name','subdomain',
      'mobile','about', 'minPrice','mail',
      'delivery','getself','reservation'];
    req.forEach((select)=>{
      this.api.get('establishment',id,select).then((res:any)=>{
        self[select] = res[select];
      }).catch((err:any)=>{});
    });
    let req2=['bg','av'];
    req2.forEach((select)=>{
      this.api.get('establishment',id,select).then((res:any)=>{
        self[select] = res[select];
      }).catch((err:any)=>{});
    });
    let req3=['worksTime'];
    req3.forEach((select)=>{
      this.api.get('establishment',id,select).then((res:any)=>{
        self[select] = res[select];
        self.getCalendarActive()
      }).catch((err:any)=>{});
    });

    self.getLinks(id)
  }

  getLinks(id){
    let self = this;
    self.links=new Links();
    this.api.get('establishment',id,'links').then((res:any)=>{
      self.linksFormat.map(it=>{
        if(res.links[it])
          self.links[it].url=res['links'][it].url || self.links[it].url
      })
      console.log(self.links)
    }).catch((err:any)=>{});
  }

  getCalendarActive(){
    const s = this;
    if(s.worksTime){
      s.api.justGet(`timeWork/${s.worksTime}`).then((val:any)=>{
        s.worksTimeView = val;
      })
    }

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
  update(obj,mod){
    let self = this;
    if(mod == "links"){
      console.log(obj);
      self.linksFormat.map(l=>{
        if(obj.links[l].url){
          if(l != 0){
            if(obj.links[l].url.search("//")>-1){
              obj.links[l].url = "https://"+obj.links[l].url.split("//")[1];
            }else{
              obj.links[l].url = "https://"+obj.links[l].url
            }
          }else{
            if(obj.links[0].url.search("//")>-1){

            }else{
              obj.links[0].url = "https://"+obj.links[0].url
            }
          }
        }
      })
    }
    this.api.doPost('establishment/'+self.id,obj).then((res:any)=>{
      self[mod] = res[mod];
    }).catch((err:any)=>{});
  }
  getCalendar(e){
    let s = this;
    console.log(e.obj);
    s.worksTime = e.obj._id;
    s.worksTimeView = e.obj;
  }
}
