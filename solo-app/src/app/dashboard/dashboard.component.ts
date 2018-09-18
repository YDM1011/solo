import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public user: any;
  public id: string;
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService
  ) { }

  ngOnInit() {
    let self = this;
    self.auth.onAuth.subscribe(value=>{
      if(value){
       self.user = value;
       self.auth.setUserData(value);
      }
    });
    this.id = this.route.snapshot.paramMap.get('id');
  }

  getSetting(res){
    let self = this;
    if(res){
      self.user = res;
      self.auth.setUserData(res);
    }
  };
}
