import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from "@angular/forms";
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-menu-content',
  templateUrl: './menu-content.component.html',
  styleUrls: ['./menu-content.component.css']
})
export class MenuContentComponent implements OnInit, OnChanges {

  public id: any;
  public menu: any;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
  ) { }

  ngOnInit() {
    const self = this;
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.route.params.subscribe((params: any) => {
      self.id = params.id;
      self.initApi(params.id);
    });
  }

  ngOnChanges(){

  }

  initApi(id) {
    let s = this;
    console.log(id);
    let query = '?populate='+JSON.stringify({path:'categories'});
    s.api.get('menu', id, query, query).then((val:any)=>{
      if(val){
        s.getMenu(val)
      }
    })
  }

  getMenu(elem) {
    const s = this;
    s.menu = elem;
    console.log(elem);
  }

  categDel(id) {
    const s = this;
    s.menu.categories.map(category => {
      console.log(id, category._id);
      if (id === category._id) {
        category.hidden = true;
      }
    });
    console.log(s.menu.categories);
  }
}
