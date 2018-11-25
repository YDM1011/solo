import { Component, OnInit, Input  } from '@angular/core';
import { ApiService } from "../../service/api.service";

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit {

  @Input() img:any = {url: '', name: '', id: ''};
  @Input() pic:string;
  private id:any;
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    let s = this;
    s.initApi(s.img);
  }

  initApi(mod){
    let s = this;
    if (mod.id && !mod.url && !mod.name){
      let query = '?select=preload,_id';
      query += '&query='+ JSON.stringify({_id: mod.id});
      s.api.get('avatar', mod.id, '', query).then((res:any)=>{
        if(res){
          s.pic = res.larg || res.preload;
          if(!res.larg){
            s.api.getAndUpdate('avatar', mod.id, '', '').then((res:any)=>{
              if(res){
                s.pic = res.larg;
              }
            })
          }
        }
      })
    }else if(!mod.id && mod.url && mod.name){
      let query = '?populate='+JSON.stringify({path:mod.name, select: '_id preload'})+'&select='+mod.name;
      let query2 = '?populate='+JSON.stringify({path:mod.name, select: '_id larg'})+'&select='+mod.name;
      s.api.get(mod.url, mod.name, '', query).then((val:any)=>{
        if(val){

          s.pic = val[mod.name].preload;
          s.api.getAndUpdate(mod.url, mod.name, '', query2).then((res:any)=>{
            if(res){
              s.pic = res[mod.name].larg;
            }
          })
        }
      })
    }
  }
}
