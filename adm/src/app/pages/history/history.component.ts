import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  public page = 1;
  public col = 20;
  public collectionSize: number;
  public history = [];  
  public foodCoin;
  public sort = '{"date":-1}';

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.initApi() 
  }

  initApi() {
    let s = this;
    s.api.apiGet('history','','').then((v:any)=>{
      s.collectionSize = v.length;      
    });
    this.letPage();
  }

  letPage() {
    const s = this;
    s.api.apiGet('history?limit=' + this.col + '&skip=' + ((this.page-1)*this.col) + '&sort=' + this.sort).then((val: any) => {
      if (val) {
        if (val.length > 0) {
          s.history = val;
        }
      }
    });
  }

}
