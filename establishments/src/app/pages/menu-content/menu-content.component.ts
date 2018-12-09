import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-menu-content',
  templateUrl: './menu-content.component.html',
  styleUrls: ['./menu-content.component.css']
})
export class MenuContentComponent implements OnInit {

  public id: any;
  public menu: any;

  constructor(
    private route: ActivatedRoute,
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

  initApi(id) {}

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
