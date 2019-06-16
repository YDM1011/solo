import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users = [];  
  public foodCoin;
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {   
    
    this.initApi()    
  }

  initApi(){
    let s = this;
    let select = ``;
    s.api.apiGet('user?limit=20&sort={"data":-1}','',select).then((v:any)=>{
      s.users = v;
    });
    s.api.apiGet('userBalanse','',select).then((v:any)=>{
      s.foodCoin = v[0];
    })
       
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
