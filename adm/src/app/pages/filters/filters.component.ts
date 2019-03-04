import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  public iscreate = false;
  public isedit = false;
  public chBoxv;
  public chAllv;
  constructor() { }

  ngOnInit() {
  }

}
