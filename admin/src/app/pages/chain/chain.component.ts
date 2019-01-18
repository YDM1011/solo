import {Component, OnInit, OnChanges} from '@angular/core';
import {ApiService} from "../../api.service";
import {ActivatedRoute} from "@angular/router";

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
  public minPrice:number;
  public links:any=[];
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
    });
    // this.initApi();
  }
  ngOnChanges() {

  }
  initApi(id){
    let self = this;
    let req=['name','subdomain', 'worksTime',
      'mobile','about','links', 'minPrice','mail',
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
  }
  update(obj,model){
    let self = this;
    try{if (self[model]['_id']){obj['params']=self[model]['_id']}}catch(err){}
    this.api.set('establishment',obj,self.id,model).then((res:any)=>{
      self[model] = res[model];
    }).catch((err:any)=>{});
  }
}
