import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-global',
  templateUrl: './category-global.component.html',
  styleUrls: ['./category-global.component.css']
})
export class CategoryGlobalComponent implements OnInit {

  public globCat:any = [];
  constructor() { }

  ngOnInit() {
    let self = this;
    self.globCat = [
      {
        name: 'pizza',
        value:'pizza',
        isActive:true
      },
      {
        name: 'sushi',
        value:'sushi',
        isActive:true
      },
    ]
  }

}
