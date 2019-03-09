import {Component, OnInit, OnChanges} from '@angular/core';
import {ApiService} from "../../api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-establishments',
  templateUrl: './establishments.component.html',
  styleUrls: ['./establishments.component.css']
})
export class EstablishmentsComponent implements OnInit, OnChanges {

  public id:any;
  public myest:any=[];
  private key:string = 'establishment';
  constructor(
    private route: ActivatedRoute,
    private api:ApiService
  ) { }

  ngOnChanges(){

  }
  ngOnInit() {
    let self = this;
    this.api.onUpDate.subscribe((val:any)=>{
      if(typeof val == "object"){
        self[val[1]] = [val[0][val[1]], ...self[val[1]]];
      }
    });
    this.id = this.route.snapshot.paramMap.get('id');
    // self.initApi(self.id);
    this.route.params.subscribe((params:any) => {
      self.id = params.id;
      console.log(params);
      self.initApi(params.id);
    });
  }

  initApi(id){
    let self = this;
    let req=['myest'];
    req.forEach((select)=>{
      this.api.get('establishment',id,select).then((res:any)=>{
        self[select] = res[select];
      }).catch((err:any)=>{});
    });
  }
  delet(id){
    let s = this;
    s.api.deletSelect(s.key,id,s.id,'myest','oneest').then((res:any)=>{
      if(res){
        s['myest'] = res['myest'];
      }
    })
  }
}
