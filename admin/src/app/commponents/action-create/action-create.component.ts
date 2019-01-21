import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-action-create',
  templateUrl: './action-create.component.html',
  styleUrls: ['./action-create.component.css']
})
export class ActionCreateComponent implements OnInit {
  public id: string;
  public action = {about:'',picC:''};

  @Output() onCreate = new EventEmitter();
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

  initApi(id){}

  getPic(e){
    let s = this;
    s.action['picC'] = e.base64crop;
    s.action['picD'] = e.base64default;
  }

  save(){
    let s = this;
    s.action['ownerEst'] = s.id;
    console.log(s.action);
    s.api.doPost('action', s.action).then((val:any)=>{
      if(val){
        s.onCreate.emit(val)
      }
    })
  }
}
