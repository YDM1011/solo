import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api.service";
import {Calendar} from "../work-time/work-time";

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit, OnChanges, OnDestroy {

  public isShow={};
  public id: string;
  public actions;
  public isCreate;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {
    let s = this;
    this.id = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe((params: any) => {
      s.id = params.id;
      s.initApi(params.id);
    });
  }
  ngOnChanges() {
    let s = this;
    this.id = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe((params: any) => {
      s.id = params.id;
      s.initApi(params.id);
    });
  }

  ngOnDestroy(){}

  initApi(id){
    const s = this;
    s.actions = [];
    s.api.justGet(`action?query={"ownerEst":"${id}"}`).then((val:any)=>{
      if(val){
        s.actions = val
      }
    })
  }

  calendarsEdit(e,calendar){
    let s = this;
    calendar=e;
    s.isShow[calendar._id] = false;
  }

  calendarsAdd(e){
    let s = this;
    s.actions.push(e);
  }

}
