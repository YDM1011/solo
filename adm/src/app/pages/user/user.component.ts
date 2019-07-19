import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  
  public page = 1;
  public col = 20;
  public collectionSize: number;
  public users = [];  
  public foodCoin;
  public sort = '{"data":-1}';
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    
    this.initApi()    
  }

  initApi() {
    let s = this;
    s.api.apiGet('user','','').then((v:any)=>{
      s.collectionSize = v.length;      
    });
    this.letPage();
  }


  //initApi(){
  //  let s = this;
  //  let select = ``;
  //  s.api.apiGet('user','',select).then((v:any)=>{
  //    s.length = v.length;
  //    s.maxPage = v.length/this.col;
  //    for (let index = 1; index <= s.maxPage; index++) {      
  //      s.allPages.push(index);
  //    }      
  //  });        
  //  s.api.apiGet('user?limit=20&sort={"data":-1}','',select).then((v:any)=>{
  //    s.users = v;
  //  });
  //  s.api.apiGet('userBalanse','',select).then((v:any)=>{
  //    s.foodCoin = v[0];
  //  })
  //     
  //}

  letPage() {
    const s = this;
    s.api.apiGet('userBalanse','','').then((v:any)=>{
        s.foodCoin = v[0];
      })
    s.api.apiGet('user?limit=' + this.col + '&skip=' + ((this.page-1)*this.col) + '&sort=' + this.sort).then((val: any) => {
      if (val) {
        if (val.length > 0) {
          s.users = val;
        }
      }
    });
  }

  more() {
    const s = this;
    s.api.apiGet('user?limit=20&skip=' + (s.users.length+1) + '&sort={"data":-1}').then((val: any) => {
      if (val) {
        if (val.length > 0) {
          s.users = s.users.concat(val);
        }
      }
    });
  }

}
