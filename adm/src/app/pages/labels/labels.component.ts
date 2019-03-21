import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css']
})
export class LabelsComponent implements OnInit {

  public iscreate = false;
  public isedit = false;
  public chBoxv;
  public chAllv;
  constructor() { }

  ngOnInit() {
  }

}
